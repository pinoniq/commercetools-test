const { apiRoot, projectKey } = require("./client.js");
const { getCustomerByKey } = require( "./customer.js" );

module.exports.createCart = (customerKey) => getCustomerByKey(customerKey).then(customer => apiRoot.carts().post({
    body: {
        currency: "EUR",
        customerId: customer.body.id,
        country: "DE" // <- this also creates a shipping address... \o/
    }
}).execute())

module.exports.createAnonymousCart = () =>
  apiRoot.withProjectKey({ projectKey })
    .carts()
    .post({
      body: {
        currency: "EUR",
        country: "DE",
      }
    })
    .execute()

module.exports.customerSignIn = (customerDetails) => {}

module.exports.getCartById = (ID) => apiRoot.carts().withId({ID}).get().execute();

module.exports.addLineItemsToCart = (cartId, arrayOfSKUs) => this.getCartById(cartId).then(cart => apiRoot.carts().withId({ID: cartId}).post({
    body: {
        version: cart.body.version,
        actions: arrayOfSKUs.map(sku => ({
            action: "addLineItem",
            sku,
        }))
    }
}).execute())

module.exports.addDiscountCodeToCart = (cartId, discountCode) => this.getCartById(cartId).then(cart => apiRoot.carts().withId({ID: cartId}).post({
    body: {
        version: cart.body.version,
        actions: [
            {
                action: "addDiscountCode",
                code: discountCode,
            }
        ]
    }
}).execute())

// this required a shipping address, even it's its just the country :(
module.exports.createOrderFromCart = (cartId) => createOrderFromCartDraft(cartId).then(orderFromCartDraft => apiRoot.orders().post({
    body: orderFromCartDraft,
}).execute())

const createOrderFromCartDraft = (cartId) => {
  return this.getCartById(cartId).then((cart) => {
    return {
      id: cart.body.id,
      version: cart.body.version,
    };
  });
};

module.exports.getOrderById = (ID) => {}

module.exports.updateOrderCustomState = (orderId, customStateKey) => {}

module.exports.createPayment = (paymentDraft) => {}

module.exports.setOrderState = (orderId, stateName) => {}

module.exports.addPaymentToOrder = (orderId, paymentId) => {}
