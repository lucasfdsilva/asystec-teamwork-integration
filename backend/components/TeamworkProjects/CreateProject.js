const axios = require('axios');

//Creates an instance of Axios with basic Auth Credentials for Teamwork
const axiosTeamwork = axios.create({
    auth: {
        username: "twp_MK5HVNe8bWkeqJh4XSt7RV83oBCs_eu",
        password: "X"
    }
});

module.exports = {

    //Creates a new Project in Teamwork
    async createProject(projectId, projectName, customerName) {
        //If an existing company is found, a new project is created in Teamwork using the company's ID along with other details provided (PJ ID & PJ Name)
        await axiosTeamwork({
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

}//END of Module Export