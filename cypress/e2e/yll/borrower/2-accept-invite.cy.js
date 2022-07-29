/// <reference types="cypress" />

import selectors from "../../../support/yll/selectors";
import {login, logout, generatePassword, copyObject} from "../../../support/yll/util";
import {getAccount, saveAccount} from '../../../support/yll/generatedAccounts';
import 'cypress-wait-until';

describe('Borrower Accept Invite from Lender', () => {
    let saveAccountComplete = false;
    let passwordResetLink;
    let userEmail;
    
    before(() => {
        cy.log('Logging in to Google Account')
        cy.request({
            method: 'POST',
            url: 'https://www.googleapis.com/oauth2/v4/token',
            body: {
                grant_type: 'refresh_token',
                client_id: Cypress.env('googleClientId'),
                client_secret: Cypress.env('googleClientSecret'),
                refresh_token: Cypress.env('googleRefreshToken'),
            },
        }).then(({ body }) => {
            const { access_token, id_token } = body
        
            cy.log('Using Google API to get Gmail inbox.')
            cy.request({
                method: 'GET',
                url: `https://gmail.googleapis.com/gmail/v1/users/${Cypress.env('googleEmail')}/messages?q="from:${Cypress.env('appEmailSender')}"}`,
                headers: { Authorization: `Bearer ${access_token}` },
            }).then(({ body }) => {
                const latestMessage = body.messages[0]

                cy.log('Getting email latest message.')
                if(latestMessage)
                {
                    cy.request({
                        method: 'GET',
                        url: `https://gmail.googleapis.com/gmail/v1/users/${Cypress.env('googleEmail')}/messages/${latestMessage.id}?format=full`,
                        headers: { Authorization: `Bearer ${access_token}` },
                    }).then(({ body }) => {
                        const encodedEmailContent = body.payload.parts[0].body.data;
                        const uint8array = Buffer.from(encodedEmailContent, 'base64');
                        let emailContent = new TextDecoder().decode(uint8array);
                        cy.log(emailContent);

                        emailContent = emailContent
                            .replace(/(\r\n|\n|\r)/gm, "") //Remove all types of newline characters.
                            .replace(/&gt;/g, '>') //sanatize
                            .replace(/&lt;/g, '<')
                            .replace(/&quot;/g, '"')
                            .replace(/&apos;/g, "'")
                            .replace(/&amp;/g, '&')
                        const usernamePattern = 'Your username is '
                        const passwordPattern = 'temporary password is '
                        const linkPattern = 'Please click <a href='
                        const tempPassword = emailContent.substring(emailContent.match(passwordPattern).index + passwordPattern.length).split(' ')[0];
                        userEmail = emailContent.substring(emailContent.match(usernamePattern).index + usernamePattern.length).split(' ')[0];

                        passwordResetLink = emailContent.substring(emailContent.match(linkPattern).index + linkPattern.length).split(' ')[0].replaceAll('"','')

                        cy.log('Collecting user details from email.')
                        cy.log(userEmail);
                        cy.log(tempPassword);
                        cy.log(passwordResetLink);

                        getAccount(userEmail).then((account) => {                            
                            account.password = tempPassword;
                            account.dateUpdated = new Date().toString();
                            saveAccount(account).then(() => saveAccountComplete = true);
                        });
                    });
                }
            });
        });
        cy.waitUntil(() => saveAccountComplete)
    });

    // after(() => {
    //     logout();
    // })

    it('Should reset password using email reset link', () => {
        cy.waitUntil(() => saveAccountComplete).then(() => {
            cy.visit(passwordResetLink).then(() => {
                cy.url().then(url => {
                    getAccount(userEmail).then((account) => {
                        let devUrl = "";
                        if (!url.includes('dev.'))
                        {
                            let devUrl = url.replace('https://app.yourlandloans', 'https://dev.app.yourlandloans');
                            cy.visit(devUrl)
                        }
                        
                        login({account, loginUrl: devUrl});

                        cy.get(selectors.pageSignIn.passwordInput).should('have.length', 1)
                        
                        cy.contains('Password requires reset').should('have.length', 1)
                        cy.contains('button', 'Reset Password').should('have.length', 1)

                        const passwordReset = generatePassword(12,1,1,1);

                        cy.get(selectors.pageSignIn.passwordInput).clear();
                        cy.get(selectors.pageSignIn.passwordInput).type(passwordReset);
                        
                        cy.on('window:alert', (text) => {
                            expect(text).to.contains('Reset Password Successful');
                        });
                        cy.contains('button', 'Reset Password').click();
                        cy.wait(3000); //Wait for alert to trigger

                        account.password = passwordReset;
                        account.dateUpdated = new Date().toString();
                        
                        saveAccount(account);

                        cy.log(`New borrower created:`);
                        cy.log(`\temail: ${account.email}`);
                        cy.log(`\tpassword: ${account.password}`);
                    });
                });
            });
        });
    });
})

