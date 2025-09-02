const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Automation Excersie Automation Report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  e2e: {
    baseUrl: 'https://automationexercise.com/',
    specPattern: 'cypress/e2e/TestCases/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    testIsolation: false,
    experimentalSessionAndOrigin: true,
    video: true,
    screenshotOnRunFailure: true,

    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;   // ✅ correctly placed
    },
  },
});
