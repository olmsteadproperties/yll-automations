/// <reference types="cypress" />

import paths from "../../../support/yll/paths";
import {login, navigate, contains, randomString, increaseTimout, copyObject} from "../../../support/yll/util";
import {generatedAccounts} from '../../../support/output/generatedAccounts.json';
import 'cypress-iframe';

const lastAccountAddedEmail = Object.keys(generatedAccounts).slice(-1);
const lastAccountAdded = generatedAccounts[lastAccountAddedEmail];

// More accounts here: https://help.chargeover.com/en/articles/105-test-credit-card-numbers-and-test-ach-echeck-bank-account-numbers
const bankAccounts = {
    success: {
        routingNumber: "072403004",
        accountNumber: "856667",
        description: "ACH/eCheck Bank Accounts that Succeed"
    },
    fail: {
        routingNumber: "072403004",
        accountNumber: "856666",
        description: "ACH/eCheck bank account number that is rejected immediately, at the time of the transaction"
    }
}

describe('Set Up Borrower Payment Method', () => {
    before(() => {
        expect(lastAccountAdded).to.have.property('password')
        expect(lastAccountAdded.password).not.to.be.empty
        login({account: lastAccountAdded})
    })

    it('Creats Dwalla and Adds Bank Info', () => {

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
                cy.embeded(false, 'get', ['input#emailInput']).type(lastAccountAdded.email);
                cy.embeded(false, 'get', ['input#firstNameInput']).type(lastAccountAdded.firstName);
                cy.embeded(false, 'get', ['input#lastNameInput']).type(lastAccountAdded.lastName);
                cy.embeded(false, 'get', ['input#checkbox[name="agreed"]']).click();
                cy.embeded(false, 'get', ['input#dwolla-customer-create-submit[value="Agree and Continue"]']).click();
            }

            //https://www.cypress.io/blog/2020/02/12/working-with-iframes-in-cypress/
            // const iframeRefresh = () => {
            //     cy.wait(3000);
            //     cy.frameLoaded('iframe');
            // }

            // //Add Payment Method
            // cy.contains('span', 'Add Payment Method'); //Can take a second to load this page so wait to see the header.

            // iframeRefresh();
            // cy.embeded(true, 'contains', ['h4', 'Search for your bank or credit union.']);  //Also takes a second for Dwalla to load so wait until you can see this header too. 
            // cy.embeded(true, 'contains', ['a', 'Bank of America']).click({force: true});

            // iframeRefresh();

            // //Select verification type
            // cy.embeded(true, 'contains', ['a', 'Use deposit verification']).click();

            // iframeRefresh();

            //Microdeposit validation //TODO: test Instant Account Verification (IAV)
            const microDepositForm = cy.contains('Using Micro Deposit').parent(); 
            
            microDepositForm.within(() => {
                //Add bank account information
                const newBankAccount = copyObject(bankAccounts.success)
                newBankAccount.bankName = randomString();
                newBankAccount.verified = false;    
                cy.get('input[name="routingNumber"]').type(newBankAccount.routingNumber);
                cy.get('input[name="accountNumber"]').type(newBankAccount.accountNumber);
                cy.get('input[name="bankName"]').type(newBankAccount.bankName);
                cy.contains('Account Type').parent().click();
            })

            cy.contains('.MuiButtonBase-root', 'Savings').click()

            //Cannot click thie button? "Element is being covered by another element"
            // microDepositForm.within(() => { 
            //     cy.get('button[type="submit"]').click();
            //     cy.contains('button', 'Add Bank').click();
            // })

            const microDepositFormSubmit = cy.contains('Using Micro Deposit').parent(); //Somehow the value of microDepositForm is changing so we have to get it again.
            microDepositFormSubmit.submit(); // Have to use direct form submit instead. 



            //TODO: fix new UI stuff
            
            // //Add bank account information
            // const newBankAccount = copyObject(bankAccounts.success)
            // newBankAccount.bankName = randomString();
            // newBankAccount.verified = false;
            // cy.embeded(true, 'get', ['input#RoutingNumber']).type(newBankAccount.routingNumber);
            // cy.embeded(true, 'get', ['input#AccountNumber']).type(newBankAccount.accountNumber);
            // cy.embeded(true, 'get', ['input#BankAccountName']).type(newBankAccount.bankName);
            // cy.embeded(true, 'contains', ['button', 'Agree & Continue']).click();

            // const updatedAccount = copyObject(lastAccountAdded);
            // let updateBankAccounts = typeof(updatedAccount.bankAccounts) == "undefined" ? {} : updatedAccount.bankAccounts;
            // updateBankAccounts[newBankAccount.bankName] = newBankAccount;
            // updatedAccount.bankAccounts = updateBankAccounts;
            // updatedAccount.dateUpdated = new Date().toString();
            // generatedAccounts[lastAccountAdded.email] = updatedAccount;
            // cy.writeFile('cypress/support/output/generatedAccounts.json', {generatedAccounts});
        });
    });
});

