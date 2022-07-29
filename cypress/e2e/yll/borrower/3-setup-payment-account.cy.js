/// <reference types="cypress" />

import paths from "../../../support/yll/paths";
import bankAccounts from "../../../support/yll/bankAccounts";
import {login, logout, navigate, contains, randomString, increaseTimout, copyObject} from "../../../support/yll/util";
import {getAccount, saveAccount} from '../../../support/yll/generatedAccounts';
import 'cypress-iframe';
import 'cypress-wait-until';

describe('Set Up Borrower Payment Method', () => {
    before(() => {
        getAccount().then((account) => {
            expect(account).to.have.property('password');
            expect(account.password).not.to.be.empty;
            login({account});
        })
    })

    // after(() => {
    //     logout();
    // })

    it('Creates Dwalla and Adds Bank Info', () => {
        getAccount().then((account) => {
            cy.wait(4000);

            //Accept terms if not accepted already
            contains('h2', 'Terms Of Services and Privacy Policy').then((result) => {
                if (result)
                {
                    cy.log("contains('h2', 'Terms Of Services and Privacy Policy')");
                    cy.log(contains('h2', 'Terms Of Services and Privacy Policy'));

                    cy.get('input[type="checkbox"]').click();
                    cy.contains('button', 'Submit').click();
                }
            })

            navigate(paths.paymentAdd);

            cy.wait(4000);
            increaseTimout(10000, false);

            contains('h4', 'Add Payment Account').then((addPaymentAccount) => { 
                if (addPaymentAccount)
                {
                    //Create Dwalla Account
                    cy.embeded(false, 'get', ['input#emailInput']).type(account.email);
                    cy.embeded(false, 'get', ['input#firstNameInput']).type(account.firstName);
                    cy.embeded(false, 'get', ['input#lastNameInput']).type(account.lastName);
                    cy.embeded(false, 'get', ['input#checkbox[name="agreed"]']).click();
                    cy.embeded(false, 'get', ['input#dwolla-customer-create-submit[value="Agree and Continue"]']).click();
                    cy.wait(20000);
                }

                cy.reload(); // This is to fix a bug where buttons never enable on first borrower load.
                
                cy.wait(4000);

                cy.contains('h5', 'Micro Deposit Verification').parent('button').click();

                //Microdeposit validation //TODO: test Instant Account Verification (IAV)
                const microDepositForm = () => cy.contains('Please enter bank details below').parent(); 

                //Add bank account information
                const newBankAccount = copyObject(bankAccounts.dwalla);
                newBankAccount.bankName = randomString();
                newBankAccount.verified = false;    
                
                microDepositForm().within(() => {
                    cy.get('input[name="routingNumber"]').type(newBankAccount.routingNumber);
                    cy.get('input[name="accountNumber"]').type(newBankAccount.accountNumber);
                    cy.get('input[name="accountNumber2"]').type(newBankAccount.accountNumber);
                    cy.get('input[name="bankName"]').type(newBankAccount.bankName);
                    cy.contains('Account Type').parent().click();
                })

                cy.contains('.MuiButtonBase-root', 'Savings').click();

                cy.contains('Next').click();

                //Verify details popup
                const confirmDetailsModel = cy.contains('Please verify bank details below').parent(); 
                confirmDetailsModel.within(() => {
                    cy.contains(newBankAccount.routingNumber);
                    cy.contains(newBankAccount.accountNumber);
                    cy.contains(newBankAccount.bankName);
                })
                
                Cypress.on('uncaught:exception', (err, runnable) => {
                    return false; //Dangeriously ignoring all uncaught exceptions
                })
                cy.on('window:alert', (text) => {
                    expect(text).to.contains('Account added successfully.');
                });
                cy.contains('button', 'Add Bank').click();
                cy.wait(3000); //Wait for alert to trigger

                account.bankAccounts = typeof(account.bankAccounts) == "undefined" ? {} : account.bankAccounts;
                account.bankAccounts[newBankAccount.bankName] = newBankAccount;
                account.dateUpdated = new Date().toString();

                saveAccount(account);
            });
        });
    });
});

