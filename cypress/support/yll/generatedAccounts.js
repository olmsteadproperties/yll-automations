const generatedAccountsFilePath = 'cypress/support/yll/generatedAccounts.json'

const getAccount = (email = "") => {
    return new Cypress.Promise((resolve, reject) => {
        cy.task('readFileMaybe', generatedAccountsFilePath).then((text) => {
            let generatedAccounts = text == null ? {} : JSON.parse(text).generatedAccounts;
            let returnAccount;
    
            if(email === "") //if no email provided get the latest added account
            {
                const lastAccountAddedEmail = Object.keys(generatedAccounts).slice(-1);
                returnAccount = generatedAccounts[lastAccountAddedEmail];
            }
            else 
            {
                returnAccount = generatedAccounts[email];
            }

            resolve(returnAccount);
        });
    });
}


const saveAccount = (data) => {
    return new Cypress.Promise((resolve, reject) => {
        cy.task('readFileMaybe', generatedAccountsFilePath).then((text) => {
            let generatedAccounts;
            generatedAccounts = text == null ? {} : JSON.parse(text);
            generatedAccounts[data.email] = data;
            cy.writeFile(generatedAccountsFilePath, {generatedAccounts}).then(() => 
                resolve()
            );
        });
    });
}

export default {
    getAccount,
    saveAccount
}