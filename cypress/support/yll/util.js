import paths from "./paths";
import selectors from "./selectors";

const login = ({account, forwardUrl = "", navigate = true}) => {
    if (navigate)
    {
        cy.visit(paths.login);
    }
    cy.get(selectors.pageSignIn.emailInput).clear().type(account.email);
    cy.get(selectors.pageSignIn.passwordInput).clear().type(account.password);
    cy.get(selectors.pageSignIn.loginButton).click();
    if (forwardUrl != "")
    {
        cy.visit(forwardUrl);
    }

    // login can take a bit so we need to set the timout to a larger number.
    increaseTimout(10000);
}

const logout = () => {
    cy.visit(paths.base);

    exists(selectors.pageHeadder.appBar).then(result => {
        if (result)
        {
            cy.get(selectors.pageHeadder.appBar).find(selectors.pageHeadder.userIcon).click();
            increaseTimout(10000);
            cy.contains('button', 'Logout').click()
        }
    })
}

const increaseTimout = (time, temporary=true) => {
    const defaultCommandTimeout = Cypress.config('defaultCommandTimeout');
    Cypress.config('defaultCommandTimeout', time);
    if (temporary)
    {
        setTimeout(() => {
            Cypress.config('defaultCommandTimeout', defaultCommandTimeout);
        }, time);
    }
}

const navigate = (path) => {
    if (path === paths.loansAddUser)
    {
        cy.get('.simplebar-wrapper').contains('Loans').click();
        cy.get('.simplebar-wrapper').contains('Add User to Loan').click();
        cy.url().should('include', path);
    }
    else if (path === paths.loansMakePayment)
    {        
        cy.get('.simplebar-wrapper').contains('Loans').click();
        cy.get('.simplebar-wrapper').contains('Make Payment').click();
        cy.url().should('include', path);
    }
    else if (path === paths.paymentAdd)
    {
        cy.get('.simplebar-wrapper').contains('Payment Methods').click();
        cy.get('.simplebar-wrapper').contains('Add Payment Method').click();
        // cy.url().should('include', path); //Sometimes this forwards to AddPaymentAccount!
    }
    else if (path === paths.paymentMethods)
    {
        cy.get('.simplebar-wrapper').contains('Payment Methods').click();
        cy.get('.simplebar-wrapper').contains('Payment Methods').get('a').contains('Payment Methods').click();
        cy.url().should('include', path);
    }
    else 
    {
        cy.warn("Path navifation not yet configured");
    }
}

const exists = (selector) => {    
    return cy.get('body').then($body => {
        const matches = [];
        for (const element of $body.find(selector)) {
            matches.push(element);
        }
        return matches.length > 0;
    });
}

const contains = (selector, text) => {
    return cy.get('body').then($body => {
        const matches = [];
        for (const element of $body.find(selector)) {
            if (element.textContent.includes(text)) {
                matches.push(element);
            }
        }
        return matches.length > 0
    });
}

const randomString = () => {
    return Math.random().toString(36).replace('0.', '');
}

const generatePassword = (minlength, caps, numbers, specialChars) => {
    const randomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    let password = [];

    password = password
        .concat(Array(caps).fill(0).map(() => randomInt('A'.charCodeAt(), 'Z'.charCodeAt())))
        .concat(Array(numbers).fill(0).map(() => randomInt('0'.charCodeAt(), '9'.charCodeAt())))
        .concat(Array(specialChars).fill(0).map(() => randomInt('!'.charCodeAt(), '&'.charCodeAt())))

    const lowers = minlength - caps - numbers - specialChars;
    if (lowers > 0)
    {
        password = password.concat(Array(lowers).fill(0).map(() => randomInt('a'.charCodeAt(), 'z'.charCodeAt())))
    }

    password.sort(() => Math.random() - 0.5);

    return String.fromCharCode(...password);
}

const copyObject = (object) => {
    //method will loose any Javascript types that have no equivalent in JSON
    return JSON.parse(JSON.stringify(object));

    //Could possible use this:
    // Native deep cloning
    // There's now a JS standard called "structured cloning", that works experimentally in Node 11 and later, will land in browsers, and which has polyfills for existing systems.

    // structuredClone(value)
    // If needed, loading the polyfill first:

    // import structuredClone from '@ungap/structured-clone';
    // See this answer for more details.
}

export default {
    logout,
    login,
    navigate,
    exists,
    contains,
    randomString,
    generatePassword,
    copyObject,
    increaseTimout
}