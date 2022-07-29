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
    },
    dwalla: {
        routingNumber: "222222226", //https://developers.dwolla.com/guides/sandbox#test-bank-account-numbers
        accountNumber: "856666",
        description: "Dwalla specific test account"
    }
}

export default bankAccounts;