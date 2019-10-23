const axios = require('axios');

//Creates an instance of Axios with basic Auth Credentials for Teamwork
const axiosTeamwork = axios.create({
    auth: {
        username: "twp_MK5HVNe8bWkeqJh4XSt7RV83oBCs_eu",
        password: "X"
    }
})

module.exports = {

    async createNewProject(req, res) {
        const { projectId } = req.params;
        const { projectName } = req.params;
        const { customerName } = req.params;

        let companyExist = false;

        axiosTeamwork({
            method: 'get',
            url: 'https://asystec.eu.teamwork.com/companies.json',
        }).then((response) => {
            //Stores Teamwork's Companies .json into a local array
            var companies = response.data.companies;

            //Checks the companies array for an existing company with the same name as provided 
            for (let i = 0; i < companies.length; i++) {
                twCompanyName = companies[i].name;
                twCompanyId = companies[i].id;

                if (twCompanyName === customerName) {
                    companyExist = true;
                    let companyInfo = {
                        name: `${companies[i].name}`,
                        id: `${companies[i].id}`
                    }
                    console.log("Company already register, creating project now...")

                    //If an existing company is found, a new project is created in Teamwork using the company's ID along with other details provided (PJ ID & PJ Name)
                    axiosTeamwork({
                        method: 'post',
                        url: 'https://asystec.eu.teamwork.com/projects.json',
                        data: {
                            "project": {
                                "name": `${projectId} - ${customerName} - ${projectName}`,
                                "description": "A demo project",
                                "startDate": "",
                                "endDate": "",
                                "companyId": `${companyInfo.id}`,
                                "newCompany": "",
                                "category-id": "0",
                                "tags": "Project",
                            }
                        }
                    }).then(res => {
                        console.log("Project ID: ", res.data.id, "STATUS: ", res.data.STATUS);

                    }).catch(err => {
                        console.log("error ", err);
                    });//End of Axios Response for creating a new project
                }

                //If the current obj the loop is checking doesn't match the company name, it marks "companyExist" as False
                else {
                    companyExist = false;
                }//END of verification of companies array for existing company
            }

                //If no match was found for the company name, the below create a new company in Teamwork with the provided customerName
                if (companyExist == false) {
                    axiosTeamwork({
                        method: 'post',
                        url: 'https://asystec.eu.teamwork.com/companies.json',
                        data: {
                            "company": {
                                "name": `${customerName}`,
                                "address_one": "Address Line 1",
                                "address_two": "Address Line 2",
                                "zip": "",
                                "city": "City",
                                "state": "State",
                                "countrycode": "IE",
                                "phone": "",
                                "fax": "",
                                "email_one": "",
                                "email_two": "",
                                "email_three": "",
                                "website": ""
                            }
                        }
                    }).then((response) => {
                        console.log("New Customer Created", response.data)

                        //After creating the new account profile, it sends another GET request for a list of all companies, this time with the new company alrady created
                        axios({
                            method: 'get',
                            url: 'https://asystec.eu.teamwork.com/companies.json',
                            auth: {
                                username: "twp_MK5HVNe8bWkeqJh4XSt7RV83oBCs_eu",
                                password: "X"
                            }
                        }).then((response) => {
                            var companies = response.data.companies;

                            for (let i = 0; i < companies.length; i++) {
                                twCompanyName = companies[i].name;
                                twCompanyId = companies[i].id;

                                if (twCompanyName === customerName) {
                                    companyExist = true;
                                    let companyInfo = {
                                        name: `${companies[i].name}`,
                                        id: `${companies[i].id}`
                                    }

                                    //Now that it found the new company, it creates the project using the new company ID, same method as the one used to create a new project for an existing company
                                    axiosTeamwork({
                                        method: 'post',
                                        url: 'https://asystec.eu.teamwork.com/projects.json',
                                        data: {
                                            "project": {
                                                "name": `${projectId} - ${customerName} - ${projectName}`,
                                                "description": "A demo project",
                                                "startDate": "",
                                                "endDate": "",
                                                "companyId": `${companyInfo.id}`,
                                                "newCompany": "",
                                                "category-id": "0",
                                                "tags": "Project",
                                            }
                                        }
                                    }).then(res => {
                                        console.log("New Project Created: Project ID: ", res.data.id, "STATUS: ", res.data.STATUS);

                                    }).catch(err => {
                                        console.log("error ", err);
                                    });//End of Axios Response for creating a new project

                                }

                                //IF in the odd time it couldn't find the newly created company. it marks it as false
                                else {
                                    companyExist = false;
                                }
                            }
                        })

                    }).catch(err => {
                        console.log(err);
                    });
                }
        })
    }
}