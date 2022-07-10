import paths from "./paths";

const selectors = {
    pageAccessDenied: {
        signInText: '.MuiTypography-root.MuiTypography-h3.MuiTypography-paragraph.css-zoxu81',
        signInButton: '.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-sizeLarge.MuiButton-containedSizeLarge.MuiButtonBase-root.css-1586fwk'
    },
    pageSignIn:
    {
        emailInput: 'input#mui-1.MuiOutlinedInput-input.MuiInputBase-input.css-yzm7vx',
        passwordInput: 'input[name="password"]',
        loginButton: '.MuiLoadingButton-root.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-sizeLarge.MuiButton-containedSizeLarge.MuiButton-fullWidth.MuiButtonBase-root.css-kh6u7a'
    },
    pageLoansAddUser:
    {
        loanDropdown: 'div#loanId.MuiSelect-select.MuiSelect-outlined.MuiOutlinedInput-input.MuiInputBase-input.css-184p1yy'
    },
    pageHeadder:
    {
        appBar: 'header.MuiAppBar-root',
        // userIcon: 'header.MuiAppBar-root > img.MuiAvatar-img'
        userIcon: 'img.MuiAvatar-img',
        appBarUsericon: 'header.MuiAppBar-root > img.MuiAvatar-img'
    }
    // PAGE_NAVIGATION:
    // {
    //     borrower: {

    //     },
    //     lender: {
    //         DASHBOARD: '',
    //         loans: ['.simplebar-wrapper', 'Loans'],
    //         LOANS_ALL: '', 
    //         LOANS_MAKE_PAYMENR: '',
    //         LOANS_ADD_NEW_LOAN: '',
    //         LOANS_ADD_USER_TO_LOAN: ['.simplebar-wrapper', 'Add User to Loan'],
    //         LOANS_LOAN_FEES: '',
    //         PAYMENT_METHODS: '',
    //         PAYMENT_METHODS_PAYMENT_METHODS: '',
    //         PAYMENT_METHODS_ADD_PAYMENT_METHOD: '',
    //     } 
    // }
}

export default selectors;