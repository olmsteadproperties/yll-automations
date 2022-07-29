const { defineConfig } = require("cypress");
const fs = require('fs')

// Populate process.env with values from .env file
require('dotenv').config()

module.exports = defineConfig({
  projectId: 'ggicp7',

  viewportWidth: 2048,
  viewportHeight: 1024,
  watchForFileChanges: false,
  chromeWebSecurity: false,
  processVideoOnPassingTest: false,
  videoCompression: false,

  e2e: {
    env: {
      googleEmail: process.env.GOOGLE_EMAIL,
      googleRefreshToken: process.env.GOOGLE_REFRESH_TOKEN,
      googleClientId: process.env.GOOGLE_CLIENTID,
      googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
      appEmailSender: 'no-reply@yourlandloans.com'
    },
    setupNodeEvents(on, config) {
      on('task', {
        readFileMaybe(filename) {
          if (fs.existsSync(filename)) {
            return fs.readFileSync(filename, 'utf8')
          }
      
          return null
        },
      })
    }
  },

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});