/// <reference types="cypress" />

describe('example to-do app', () => {
    const signInTextClass = '.MuiTypography-root.MuiTypography-h3.MuiTypography-paragraph.css-zoxu81';
    const expectedSignInText = 'Sorry, you must be logged in to view this content!';

    beforeEach(() => {
        cy.viewport(1024, 768)
        cy.visit('https://dev.app.yourlandloans.com/loans')
    })

    it('Should restrict access if you have not logged in yet.', () => {
        cy.get(signInTextClass).should('have.length', 1)
        cy.get(signInTextClass).should('have.text', expectedSignInText);
    })
})

  