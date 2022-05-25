const { apiRoot, storeApiRoot, projectKey } = require("./client.js");

//TODO store and productProjection endpoint

module.exports.getStoreByKey = (key) =>
  apiRoot
    .stores()
    .withKey({key})
    .get()
    .execute()


module.exports.getCustomersInStore = (storeKey) => storeApiRoot.inStoreKeyWithStoreKeyValue({storeKey}).customers().get().execute()

module.exports.addProductSelectionToStore = async (storeKey, productSelectionKey) => this.getStoreByKey(storeKey).then(store =>
    apiRoot.stores().withKey({key: storeKey}).post({
        body: {
            version: store.body.version,
            actions: [{
                action: "addProductSelection",
                productSelection: {
                    key: productSelectionKey,
                    active: true,
                }
            }],
        }
    }).execute()
)

module.exports.getProductsInStore = (storeKey) => storeApiRoot.inStoreKeyWithStoreKeyValue({storeKey}).productProjections().get().execute()

module.exports.createInStoreCart = (storeKey, customer) => {
    const shippingAddress = customer.body.addresses.find(a => a.id = customer.body.shippingAddressIds[0]);
    return storeApiRoot.inStoreKeyWithStoreKeyValue({storeKey}).carts().post({
        body: {
            currency: "EUR",
            customerId: customer.body.id,
            country: shippingAddress.country,
            shippingAddress: {
                country: shippingAddress.country,
            },
        }
    })
}