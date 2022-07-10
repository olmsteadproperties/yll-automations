// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

import 'cypress-iframe';

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//https://www.cypress.io/blog/2020/02/12/working-with-iframes-in-cypress/
Cypress.Commands.add('embeded', (isIframe, method, params) => {
    if (isIframe)
    {
        if (method === "get")
        {
            method = "find";
        }
        return cy.iframe()[method](...params);
    }
    else
    {
        params.push({ includeShadowDom: true });
        return cy[method](...params);
    }

});



// Cypress.Commands.add('getEmailInbox', () => {
//     cy.log('Logging in to Google')
//     cy.request({
//       method: 'POST',
//       url: 'https://www.googleapis.com/oauth2/v4/token',
//       body: {
//         grant_type: 'refresh_token',
//         client_id: Cypress.env('googleClientId'),
//         client_secret: Cypress.env('googleClientSecret'),
//         refresh_token: Cypress.env('googleRefreshToken'),
//       },
//     }).then(({ body }) => {
//       const { access_token, id_token } = body
  
//       cy.request({
//         method: 'GET',
//         url: 'https://gmail.googleapis.com/gmail/v1/users/' + Cypress.env('googleEmail') + '/messages',
//         headers: { Authorization: `Bearer ${access_token}` },
//       }).then(({ body }) => {
//         cy.log(body)
//         const userItem = {
//           token: id_token,
//           user: {
//             googleId: body.sub,
//             email: body.email,
//             givenName: body.given_name,
//             familyName: body.family_name,
//             imageUrl: body.picture,
//           },
//         }
  
//         window.localStorage.setItem('googleCypress', JSON.stringify(userItem))
//       })
//     })
//   })