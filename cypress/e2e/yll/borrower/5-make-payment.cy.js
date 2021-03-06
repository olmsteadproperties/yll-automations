/// <reference types="cypress" />

import paths from "../../../support/yll/paths";
import {login, logout, navigate, randomString} from "../../../support/yll/util";
import {getAccount, saveAccount} from '../../../support/yll/generatedAccounts';

const loanName = "Cypress Test Loan"

describe('Add Borrower to Loan', () => {
    before(() => {
        getAccount().then((account) => {
            login({account});
        });
    })

    // after(() => {
    //     logout();
    // })

    it('Make Payment on Loan', () => {
        getAccount().then((account) => {
            navigate(paths.loansMakePayment);

            cy.get('div.MuiSelect-select').click();
            cy.contains('p', loanName).click();

            cy.get('input#paymentAmount').type("1234.56");

            const regex1 = /[^0-9](?=[0-9])/g;
            const regex2 = /[^a-zA-Z](?=[a-zA-Z])/g;
            const bankAccount = account.bankAccounts[Object.keys(account.bankAccounts).slice(-1)];
            const nameWithSpaces = bankAccount.bankName.replace(regex1, '$& ').replace(regex2, '$& ');
            cy.log('name with spaced ' + nameWithSpaces);
            cy.contains('Select Bank Account').parent().contains(nameWithSpaces, {matchCase: false}).click();
            cy.contains('Payment Timing').parent().contains('Payment Due Now').click();
            cy.contains('label', 'Notes (Optional)').parent().get('input[placeholder="Extra January Payment"]').type('Cypress automated test payment.');

            cy.contains('button', 'Confirm Payment').click();

            // cy.contains('button', 'Confirm Payment of $1,234.56').click() //Cannot click thie button? "Element is being covered by another element"
            cy.get('form').submit() // Have to use direct form submit instead. 
        });
    })
})

