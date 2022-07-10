/// <reference types="cypress" />

import accounts from "../../../support/yll/accounts";
import paths from "../../../support/yll/paths";
import {login, navigate, randomString} from "../../../support/yll/util";
import {generatedAccounts} from '../../../support/output/generatedAccounts.json';

import 'cypress-wait-until';

const loanName = "Cypress Test Loan"

const lastName = randomString();
const newAccount = {
    firstName: 'Testy',
    lastName: lastName,
    email: Cypress.env('googleEmail').replace('@', `+${lastName}@`),
    dateCreated: new Date().toString()
}

generatedAccounts[newAccount.email] = newAccount

const inviteAccount = true;

describe('Add Borrower to Loan', () => {
    before(() => {
        login({account: accounts.lender});
        cy.wait(1000);
        navigate(paths.loansAddUser);
    })

    it('Should fill out fields with borrow information ', () => {
        cy.get('#loanId').click();
        cy.contains(loanName).should('have.length', 1);
        cy.contains(loanName).click();

        cy.get('input#firstName').type(newAccount.firstName);
        cy.get('input#lastName').type(newAccount.lastName);
        cy.get('input#userEmail').type(newAccount.email);
        if (inviteAccount) 
        {
            cy.contains('button', 'Submit').click();
        }
        
        cy.writeFile('cypress/support/output/generatedAccounts.json', {generatedAccounts});        
    })
})

