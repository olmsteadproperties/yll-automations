/// <reference types="cypress" />

const baseUrl = 'https://dev.app.yourlandloans.com'

const selectors = {
    PAGE_ACCESS_DENIED: {
        SIGN_IN_TEXT: '.MuiTypography-root.MuiTypography-h3.MuiTypography-paragraph.css-zoxu81',
        SIGN_IN_BUTTON: '.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-sizeLarge.MuiButton-containedSizeLarge.MuiButtonBase-root.css-1586fwk'
    },
    PAGE_SIGN_IN:
    {
        EMAIL_INPUT: 'input#mui-1.MuiOutlinedInput-input.MuiInputBase-input.css-yzm7vx',
        PASSWORD_INPUT: '.MuiOutlinedInput-input.MuiInputBase-input.MuiInputBase-inputAdornedEnd.css-1nuss9t',
        LOGIN_BUTTON: '.MuiLoadingButton-root.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-sizeLarge.MuiButton-containedSizeLarge.MuiButton-fullWidth.MuiButtonBase-root.css-kh6u7a'
    }
}

const users = {
    BORROWER: {
        EMAIL: 'TestBorrower@YourLandLoans.com',
        PASSWORD: '7890y7@5v2NEuYPnbG'
    },
    LENDER: {
        EMAIL: 'TestLender@YourLandLoans.com',
        PASSWORD: '$2BMt62ZiEgvgsGwIb'
    }
}

describe('Access prior to login', () => {
    const expectedSignInText = 'Sorry, you must be logged in to view this content!';

    beforeEach(() => {
        cy.viewport(1024, 768)
        cy.visit(baseUrl + '/dashboard/loans');
    })

    it('Should restrict access if you have not logged in yet.', () => {
        cy.contains(expectedSignInText).should('have.length', 1)
    })
})

describe('Login Process', () => {
    beforeEach(() => {
        cy.viewport(1024, 768)
        cy.visit(baseUrl);
    })

    it('Should allow navigation to login page.', () => {
        cy.get(selectors.PAGE_ACCESS_DENIED.SIGN_IN_BUTTON).click();

        it('Should show field requirements when not entered')
        {
            cy.contains('Email is required').should('have.length', 0)
            cy.contains('Password is required').should('have.length', 0)

            cy.get(selectors.PAGE_SIGN_IN.LOGIN_BUTTON).click();

            cy.contains('Email is required').should('have.length', 1)
            cy.contains('Password is required').should('have.length', 1)
        }

        it('Should allow lender login')
        {
            cy.get(selectors.PAGE_SIGN_IN.EMAIL_INPUT).type(users.LENDER.EMAIL);
            cy.get(selectors.PAGE_SIGN_IN.PASSWORD_INPUT).type(users.LENDER.PASSWORD);
            cy.get(selectors.PAGE_SIGN_IN.LOGIN_BUTTON).click();
        }
    })
})
  