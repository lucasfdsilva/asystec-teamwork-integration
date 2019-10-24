const axios = require('axios');

//Creates an instance of axios with basicAuth configured
const axiosTeamwork = axios.create({
    auth: {
        username: "twp_MK5HVNe8bWkeqJh4XSt7RV83oBCs_eu",
        password: "X"
    }
});

module.exports = {

    //Verifies in Teamwork if the Customer already has a profile created
    async verifyExistingCompany(customerName) {

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
                    console.log("Company is already registered...")
                    companyExist = true;
                    return companyExist, companyInfo;
                }
                //If the current obj the loop is checking doesn't match the company name, it marks "companyExist" as False
                else {
                    companyExist = false;
                    return companyExist;
                }//END of verification of companies array for existing company

            }
        })
    }//END of Checking for Existing Company

}//END of Module Export