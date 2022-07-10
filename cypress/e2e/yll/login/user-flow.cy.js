/// <reference types="cypress" />

import accounts from "../../../support/yll/accounts";
import selectors from "../../../support/yll/selectors";
import paths from "../../../support/yll/paths";
import {logout} from "../../../support/yll/util";

describe('User flow', () => {

    before(() => {
        logout();
    });

    after(() => {
        logout();
    });

    describe('Access prior to login', () => {
        const expectedSignInText = 'Sorry, you must be logged in to view this content!';

        before(() => {
            cy.visit(paths.loans);
        });

        it('Should restrict access if you have not logged in yet.', () => {
            cy.contains(expectedSignInText).should('have.length', 1)
        });

    });

    describe('Login Process', () => {
        beforeEach(() => {
            cy.visit(paths.base);
        });

        it('Should allow navigation to login page.', () => {
            cy.get(selectors.pageAccessDenied.signInButton).click();

            it('Should show field requirements when not entered')
            {
                cy.contains('Email is required').should('have.length', 0)
                cy.contains('Password is required').should('have.length', 0)

                cy.get(selectors.pageSignIn.loginButton).click();

                cy.contains('Email is required').should('have.length', 1)
                cy.contains('Password is required').should('have.length', 1)
            }

            it('Should allow lender login')
            {
                cy.get(selectors.pageSignIn.emailInput).type(accounts.lender.email);
                cy.get(selectors.pageSignIn.passwordInput).type(accounts.lender.password);
                cy.get(selectors.pageSignIn.loginButton).click();
            }
        });
    });
});
  