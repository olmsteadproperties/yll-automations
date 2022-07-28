/// <reference types="cypress" />

import paths from "../../../support/yll/paths";
import {login, logout, navigate, copyObject} from "../../../support/yll/util";
import {generatedAccounts} from '../../../support/output/generatedAccounts.json';

const lastAccountAddedKey = Object.keys(generatedAccounts).slice(-1);
const lastAccountAdded = generatedAccounts[lastAccountAddedKey];
const lastBankAccountAddedKey = Object.keys(lastAccountAdded.bankAccounts).slice(-1);
const lastBankAccountAdded = lastAccountAdded.bankAccounts[lastBankAccountAddedKey];

describe('Add Borrower to Loan', () => {
    before(() => {
        login({account: lastAccountAdded});
    })

    // after(() => {
    //     logout();
    // })

    it('Verify Latest Bank Account', () => {
        navigate(paths.paymentMethods);

        const accountRow = cy.contains(lastBankAccountAdded.bankName).parentsUntil('tr').parent(); 
        
        accountRow.contains('button', 'Verify').click();
        cy.get('input#amt1').type(".01");
        cy.get('input#amt2').type(".01");

        cy.on('window:alert', (text) => {
            expect(text).to.contains('Funding source verified successfully.');
        });
        // cy.get('div.MuiBox-root').contains('button', 'Verify').click(); //Cannot click thie button? "Element is being covered by another element"
        cy.get('form').submit() // Have to use direct form submit instead. 

        cy.wait(3000); //Wait for alert to trigger
        
        const updatedAccountRow = cy.contains(lastBankAccountAdded.bankName).parentsUntil('tr').parent(); 
        updatedAccountRow.contains('span', 'Verified');
        
        const updatedAccount = copyObject(lastAccountAdded);
        updatedAccount.bankAccounts[lastBankAccountAdded.bankName].verified = true;
        updatedAccount.dateUpdated = new Date().toString();
        generatedAccounts[lastAccountAdded.email] = updatedAccount;
        cy.writeFile('cypress/support/output/generatedAccounts.json', {generatedAccounts});
    })
})

