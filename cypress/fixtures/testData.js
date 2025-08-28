const { faker } = require('@faker-js/faker')

function generateUser() 
{
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: `test_${Date.now()}@example.com`,
    password: faker.internet.password({ length: 10, symbols: true }),
    company: faker.company.name(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipcode: faker.location.zipCode(),
    mobile: faker.phone.number('##########'),
    country: 'Canada',
    title: faker.helpers.arrayElement(['Mr', 'Mrs']),
    day: faker.number.int({ min: 1, max: 28 }).toString(),
    month: faker.date.month(),
    year: faker.number.int({ min: 1970, max: 2000 }).toString(),
  }
}

module.exports = { generateUser }






// Generate fake data
            // const firstName = faker.person.firstName();
            // const lastName = faker.person.lastName();
            // const email = `test_${Date.now()}@example.com`;
            // const password = faker.internet.password({ length: 10, symbols: true });
            // const company = faker.company.name();
            // const address = faker.location.streetAddress();
            // const city = faker.location.city();
            // const state = faker.location.state();
            // const zipcode = faker.location.zipCode();
            // const mobile = faker.phone.number('##########');
            // const country = 'Canada'; // or faker.location.country() if needed

            // // Handling radiobutton
            // const title = faker.helpers.arrayElement(['Mr', 'Mrs']);

            // // Handle dropdown
            // const day = faker.number.int({ min: 1, max: 28 }).toString(); // safe for February
            // const month = faker.date.month();
            // const year = faker.number.int({ min: 1970, max: 2000 }).toString();