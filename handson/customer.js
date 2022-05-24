const { apiRoot, projectKey } = require("./client.js");

module.exports.getCustomerById = (ID) => apiRoot
.customers()
.withId({ ID, })
.get()
.execute();

module.exports.getCustomerByKey = (key) => apiRoot
    .customers()
    .withKey({ key, })
    .get()
    .execute();

const createCustomerDraft = (customerData) => ({
    firstName: customerData.firstName,
    lastName: customerData.lastName,
    email: customerData.email,
    key: customerData.key,
    password: customerData.password,
    addresses: [{
        country: customerData.countryCode,
    }],
    defaultBillingAddress: 0,
    defaultShippingAddress: 0,
});

module.exports.createCustomer = (customerData) => apiRoot
    .customers()
    .post({
        body: createCustomerDraft(customerData)
    }).execute();

module.exports.createCustomerToken = (customer) => apiRoot
    .customers().emailToken()
    .post({
        body: {
            id: customer.body.id,
            ttlMinutes: 10,
        }
    })
    .execute();

module.exports.confirmCustomerEmail = (token) =>
    apiRoot.customers().emailConfirm().post({
        body: {
            tokenValue: token.body.value,
        }
    }).execute()

module.exports.assignCustomerToCustomerGroup = (
  customerId,
  customerGroupKey
) => this.getCustomerById(customerId).then(
    customer => apiRoot.customers().withId({ID: customerId}).post({
        body: {
            version: customer.body.version,
            actions: [
                {
                    action: 'setKey',
                    key: "jm-customer",
                }
            ]
        }
    }).execute()
);
