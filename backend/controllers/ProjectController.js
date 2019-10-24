const VerifyExistingCompany = require('../components/TeamworkProjects/VerifyExistingCompany');
const CreateCompanyProfile = require('../components/TeamworkProjects/CreateCompanyProfile');
const CreateProject = require('../components/TeamworkProjects/CreateProject');

module.exports = {

    //Initiates the process of creation of a new project in Teamwork
    async newProjectSetup(req, res) {
        const { projectId } = req.params;
        const { projectName } = req.params;
        const { customerName } = req.params;

        let companyStatus = VerifyExistingCompany.verifyExistingCompany(customerName);

        if (companyStatus.companyExist === true) {
            CreateProject.createProject();
        }
        else {
            CreateCompanyProfile.createCompanyProfile();

            CreateProject.createProject();
        }
    }

}//END of Module Export