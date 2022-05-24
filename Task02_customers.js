const {
  createCustomer,
  getCustomerById,
  getCustomerByKey,
  createCustomerToken,
  confirmCustomerEmail,
  assignCustomerToCustomerGroup,
} = require("./handson/customer");
const { log } = require("./logger.js");

const customerDraftData = {
  firstName: "Jeroen",
  lastName: "Meeus",
  email: "jmeeus@reference.com",
  password: "password",
  key: "jm-customer",
  countryCode: "DE",
};

// createCustomer(customerDraftData).then(log).catch(log);

//getCustomerByKey('jm-customer').then(log).catch(log);

// getCustomerById("78e8ff6c-89b8-44d1-9e5b-fe7173e876c5").then(log).catch(log);

/*getCustomerById("78e8ff6c-89b8-44d1-9e5b-fe7173e876c5")
   .then(createCustomerToken)
   .then(confirmCustomerEmail)
   .then(log)
   .catch(log);//*/

assignCustomerToCustomerGroup('78e8ff6c-89b8-44d1-9e5b-fe7173e876c5','indoor-customers').then(log).catch(log);
