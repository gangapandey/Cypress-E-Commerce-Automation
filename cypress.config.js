const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://automationexercise.com/',
    specPattern: 'cypress/e2e/TestCases/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    testIsolation: false,
    experimentalSessionAndOrigin: true,
    video: true,
    screenshotOnRunFailure: true,

    setupNodeEvents(on, config) {
      // Add Mochawesome reporter
      on('after:run', (results) => {
        console.log('Cypress run finished!');
      });

      return config;
    }
  },

  reporter: 'mochawesome',  // <-- add this
  reporterOptions: {
    reportDir: 'cypress/reports',  // folder where reports will be saved
    overwrite: true,
    html: true,   // generate HTML report
    json: true    // generate JSON report too
  }
});
