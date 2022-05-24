const { apiRoot } = require("./handson/client.js");
const { log } = require("./logger.js");

// TODO : GET project details
// So this code displays the project configuration
// https://docs.commercetools.com/http-api-projects-project.html#get-project
/*apiRoot
    .get()
    .execute()
    .then(log)
    .catch(log);//*/

// TODO : GET ShippingMethod by ID
const shippingMethodId = 'cb6ed594-c688-47ab-8f48-4d1ceefa8457';
apiRoot.shippingMethods()
    .withId({ ID: shippingMethodId })
    .get()
    .execute().then(log).catch(log)


// TODO : GET Tax Category by key
