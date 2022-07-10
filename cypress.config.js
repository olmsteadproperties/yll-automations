const { defineConfig } = require("cypress");

// Populate process.env with values from .env file
require('dotenv').config()

module.exports = defineConfig({
  projectId: 'ggicp7',
  viewportWidth: 2048,
  viewportHeight: 1024,

  watchForFileChanges: false,

  chromeWebSecurity: false,

  e2e: {
    env: {
      googleEmail: process.env.GOOGLE_EMAIL,
      googleRefreshToken: process.env.GOOGLE_REFRESH_TOKEN,
      googleClientId: process.env.GOOGLE_CLIENTID,
      googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
      appEmailSender: 'no-reply@yourlandloans.com'
    }
  },

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});


// async function getEmail(){
//     let inbox = new Inbox('credentials_gmail.json');
//     await inbox.authenticateAccount(); // logs user in
    
//     let messages = await inbox.getLatestMessages();

//     console.log("my inbox messages", JSON.stringify(messages,null,4));
// }