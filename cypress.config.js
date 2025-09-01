const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://automationexercise.com/',
    specPattern: 'cypress/e2e/TestCases/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    testIsolation: false,
    //experimentalSessionAndOrigin: true, // optional for session management
    video: false,

    setupNodeEvents(on, config) {
      // implement node event listeners here
        return config
    },
    video:false,
    
  },
});
