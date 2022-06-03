/// <reference types="cypress" />

describe('example to-do app', () => {
    beforeEach(() => {
        cy.visit('https://dev.app.yourlandloans.com/loans')
    })

    it('Should restrict access if you have not logged in yet.', () => {
        cy.get('.MuiTypography-root.MuiTypography-h3.MuiTypography-paragraph.css-zoxu81').should('have.length', 1)
        cy.get('.MuiTypography-root.MuiTypography-h3.MuiTypography-paragraph.css-zoxu81').should('have.text', 'Sorry, you must be logged in to view this content!');
    })
})

  