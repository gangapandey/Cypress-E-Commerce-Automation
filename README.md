# E-Commerce Automation Project - Automation Exercise

[![Cypress](https://img.shields.io/badge/cypress-12.17.0-brightgreen.svg)](https://www.cypress.io/)
[![Node.js](https://img.shields.io/badge/node-18+-blue.svg)](https://nodejs.org/)
[![JavaScript](https://img.shields.io/badge/javascript-ES6-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
![CI/CD](https://img.shields.io/badge/CI/CD-Purple?style=for-the-badge)


This is a **Cypress-based automation testing framework** for an E-Commerce web application, designed using the **Page Object Model (POM)**. The project covers **end-to-end user flows**, including registration, login, product selection, checkout, payment, and logout, along with **negative test scenarios**. It also integrates **reporting, screenshots, and CI/CD pipeline** for a complete automation workflow.

---
## Features

- **Page Object Model (POM)**: Clean separation of page elements and test logic  
- **End-to-End Test Coverage**: Registration, login, product selection, cart, checkout, payment, logout  
- **Negative Test Scenarios**: Invalid login, empty cart checkout, invalid payment details  
- **Test Reporting**: HTML reports, screenshots, and videos  
- **CI/CD Integration**: GitHub Actions workflow triggers on push  
- **Custom Commands**: Reusable Cypress commands  
- **Cross-Browser Support**: Chrome (can extend to Firefox, Edge)  
- **Data-Driven Testing**: Fixtures for reusable test data  

---

## Project Structure

```
├── .github
│ └── workflows
│ └── build.yml       # GitHub Actions workflow for CI/CD
├── cypress
│ ├── e2e
│ │ ├── PageObjects   # Page Object Model classes
│ │ │ ├── HomePage.js
│ │ │ ├── RegisterPage.js
│ │ │ ├── LoginPage.js
│ │ │ ├── ProductPage.js
│ │ │ ├── CartPage.js
│ │ │ ├── CheckoutPage.js
│ │ │ ├── PaymentPage.js
│ │ │ └── LogoutPage.js
│ │ └── TestCases # Test scripts
│ │ └── fullflow.cy.js
│ ├── fixtures
│ │ └── testData.js
│ ├── reports
│ │ └── html           # HTML test reports
│ ├── screenshots      # Screenshots of failures
│ ├── videos           # Test execution videos
│ └── support
│ ├── commands.js      # Custom Cypress commands
│ └── e2e.js           # Global support file
├── cypress.config.js  # Cypress configuration
├── package.json       # Project dependencies
└── README.md          # Project documentation
```
--- 

## Prerequisites
- Node.js v18 or above
- npm (comes with Node.js)
- Chrome or Firefox browser

---
## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd <repository-folder>
```
2. Install dependencies
```bash
npm install
```

Running Test
Running all tests in headless mode
```bash
npx cypress run --spec "cypress/e2e/TestCases/fullflow.cy.js"

```
Run a specific test in Cypress GUI:
```bash
npx cypress open
```

## Test Reporting
- **HTML reports** are generated in: `cypress/reports/html/index.html`  
- **Screenshots** for failed test cases are saved in: `cypress/screenshots/`  
- **Test execution videos** are saved in: `cypress/videos/`

## CI/CD Integration

- GitHub Actions workflow is located at `.github/workflows/build.yml`  
- Automatically triggers Cypress tests on push to `main` branch  
- Generates HTML reports, screenshots, and videos as workflow artifacts  

## Negative Test Coverage

- Invalid payment card number  
- Expired card  
- Checkout with empty cart  
- Login/Registration failure scenarios  

These tests demonstrate robust error handling and edge case coverage.  

##  Test Execution Video

[Watch full test execution video](https://github.com/<username>/<repo>/blob/main/cypress/videos/fullflow.cy.js.mp4)






