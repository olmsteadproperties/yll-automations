## Your Land Loans - Automations

## Getting started

- Recommended `node js 14+` and `npm 6+`
- Install dependencies: `npm install` or `yarn install`
- Start the server: `npm run cypress:open`
- Add the .env file manually. This file contains sentive credentials and needs to be obtained securly. It should contain the following values:

```
GOOGLE_EMAIL = 'yourlandloans@gmail.com'
GOOGLE_CLIENTID = '14691163212-smr7kauj98312rhq1i3h5v3n6dthcg3t.apps.googleusercontent.com'
GOOGLE_CLIENT_SECRET = 'GOCSP...YtXSp4s' // this is private and nees to be optianed from a team member or lastpass.
GOOGLE_REFRESH_TOKEN = '1//04vIJ...YJs0fN0' // this is private and nees to be optianed from a team member or lastpass.
```

### Windows

If you get the error:

```yarn.ps1 cannot be loaded because running scripts is disabled on this system. For more information, see about_Execution_Policies```

run the following as an admin in powershell: 
`Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope LocalMachine`

### VSCode

#### Run

To run in VSCode use the command `Run Cypress`.

#### Record to Cypress.io

To record and save a run to to the cloud use `Record Cypress`. This will save and can be viewed here: https://dashboard.cypress.io/projects/ggicp7/runs

## License

Private

## Contact

Technical Contact: michaelkatic+yll@gmail.com
