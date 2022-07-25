/// <reference types="cypress" />

import paths from "../../../support/yll/paths";
import {login, navigate, randomString} from "../../../support/yll/util";
import {generatedAccounts} from '../../../support/output/generatedAccounts.json';

const lastAccountAddedKey = Object.keys(generatedAccounts).slice(-1);
const lastAccountAdded = generatedAccounts[lastAccountAddedKey];
const lastBankAccountAddedKey = Object.keys(lastAccountAdded.bankAccounts).slice(-1);
const lastBankAccountAdded = lastAccountAdded.bankAccounts[lastBankAccountAddedKey];

const loanName = "Cypress Test Loan"

describe('Add Borrower to Loan', () => {
    before(() => {
        login({account: lastAccountAdded});
    })

    it('Make Payment on Loan', () => {
        navigate(paths.loansMakePayment);

        cy.get('div.MuiSelect-select').click();
        cy.contains('p', loanName).click();

        cy.get('input#paymentAmount').type("1234.56");

        var regex1 = /[^0-9](?=[0-9])/g;
        var regex2 = /[^a-zA-Z](?=[a-zA-Z])/g;
        var nameWithSpaces = lastBankAccountAdded.bankName.replace(regex1, '$& ').replace(regex2, '$& ');
        cy.log('name with spaced ' + nameWithSpaces);
        cy.contains('Select Bank Account').parent().contains(nameWithSpaces, {matchCase: false}).click();
        cy.contains('Payment Timing').parent().contains('Payment Due Now').click();
        cy.contains('label', 'Notes (Optional)').parent().get('input[placeholder="Extra January Payment"]').type('Cypress automated test payment.');

        cy.contains('button', 'Confirm Payment').click();

        // cy.contains('button', 'Confirm Payment of $1,234.56').click() //Cannot click thie button? "Element is being covered by another element"
        cy.get('form').submit() // Have to use direct form submit instead. 
    })
})

