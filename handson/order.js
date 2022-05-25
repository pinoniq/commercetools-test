const { apiRoot, projectKey } = require("./client.js");
const { getCustomerByKey } = require( "./customer.js" );

module.exports.createCart = (customerKey) => getCustomerByKey(customerKey).then(customer => {
    const shippingAddress = customer.body.addresses.find(a => a.id = customer.body.shippingAddressIds[0]);
    return apiRoot.carts().post({
        body: {
            currency: "EUR",
            customerId: customer.body.id,
            country: shippingAddress.country,
            shippingAddress: {
                country: shippingAddress.country,
            },
        }
    }).execute();
});

module.exports.createAnonymousCart = () =>
  apiRoot
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

module.exports.getOrderById = (ID) => apiRoot.orders().withId({ID}).get().execute();

module.exports.updateOrderCustomState = (orderId, customStateKey) => this.getOrderById(orderId).then(order => apiRoot.orders().withId({ID: orderId}).post({
    body: {
        version: order.body.version,
        actions: [{
            action: "transitionState",
            state: {
                key: customStateKey
            },
        }],
    },
}).execute());

module.exports.createPayment = (paymentDraft) => apiRoot.payments().post({
    body: paymentDraft,
}).execute();

module.exports.setOrderState = (orderId, stateName) => this.getOrderById(orderId).then(order => apiRoot.orders().withId({ID: orderId}).post({
    body: {
        version: order.body.version,
        actions: [{
            action: "changeOrderState",
            orderState: stateName,
        }],
    },
}).execute())

module.exports.addPaymentToOrder = (orderId, paymentId) => this.getOrderById(orderId).then(order => apiRoot.orders().withId({ID: orderId}).post({
    body: {
        version: order.body.version,
        actions: [{
            action: "addPayment",
            payment: {
                id: paymentId,
            },
        }],
    },
}).execute())
