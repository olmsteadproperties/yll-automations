const devUrl = 'https://dev.app.yourlandloans.com';
const prodUrl = 'https://app.yourlandloans.com';

const url = devUrl;

const paths = {
    base: '',
    login: '/login',
    loans: '/dashboard/loans',
    loansAddUser: '/dashboard/loans/addUserToLoan',
    loansMakePayment: '/dashboard/makePayment',
    paymentAdd: '/dashboard/addPaymentAccount',
    paymentMethods: '/dashboard/paymentMethods'
}

const GetPaths = (base) => {
    const fullPaths = {};

    for (const [key, value] of Object.entries(paths)) {
        fullPaths[key] = base + value;
    }

    return fullPaths;
}

export default GetPaths(url);