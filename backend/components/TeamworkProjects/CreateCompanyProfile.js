const axios = require('axios');

//Creates an instance of axios with basicAuth configured
const axiosTeamwork = axios.create({
    auth: {
        username: "twp_MK5HVNe8bWkeqJh4XSt7RV83oBCs_eu",
        password: "X"
    }
});

module.exports = {

    //Creates a new company profile in Teamwork
    async createCompanyProfile(customerName){
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
        });

    }//End of Create Company Method

}//END of Module Export