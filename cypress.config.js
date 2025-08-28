const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://automationexercise.com/',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',

    setupNodeEvents(on, config) {
      // implement node event listeners here
        return config
    },
    video:false,
  },
});
