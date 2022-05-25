const { apiRoot, projectKey } = require("./client.js");

//TODO Product Selections

module.exports.getProductSelectionByKey = (key) =>
  apiRoot
    .productSelections()
    .withKey({ key })
    .get()
    .execute();

module.exports.createProductSelection = (key, name) => apiRoot.productSelections().post({
    body: {
        key,
        name: {
            en: "name",
            de: "name",
        }
    }
}).execute()

module.exports.addProductsToProductSelection = async (
  productSelectionKey,
  arrayOfProductKeys
) => this.getProductSelectionByKey(productSelectionKey).then(productSelection =>
    apiRoot.productSelections()
    .withId({ID: productSelection.body.id})
    .post({
        body: {
            version: productSelection.body.version,
            actions: arrayOfProductKeys.map(key => ({
                action: "addProduct",
                product: { key, }
            }))
        }
    }).execute()
)

module.exports.getProductsInProductSelection = (productSelectionKey) => apiRoot.productSelections().withKey({key: productSelectionKey}).products().get().execute()