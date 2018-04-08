const { client } = require(`nightwatch-cucumber`);

const { Given, run } = require(`../helpers/step`);

Given(/I have successfully registered/, () => {
  run(`When I open "http://localhost:8080"`);
  run(`And I enter "Markus" in the first name field`);
  run(`And I click on the submit button`);

  return client;
});

Given(/I have submitted invalid registration data/, () => {
  run(`When I open "http://localhost:8080"`);
  run(`And I click on the submit button`);

  return client;
});
