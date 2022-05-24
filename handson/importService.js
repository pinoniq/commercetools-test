const { importApiRoot, projectKey } = require("./client.js");
const csvtojsonV2 = require("csvtojson");

module.exports.createImportContainer = (key) => importApiRoot.importContainers().post({
  body: {
    key,
  }
}).execute();

module.exports.checkImportSummary = (importContainerKey) => importApiRoot
.importContainers().withImportContainerKeyValue({importContainerKey})
    .importSummaries().get().execute();

module.exports.checkImportOperations = (importContainerKey) => importApiRoot
.importContainers().withImportContainerKeyValue({importContainerKey})
.importOperations().get().execute();

module.exports.checkImportOperationById = (id) => importApiRoot
    .importOperations()
    .withIdValue({id})
    .get().execute();

module.exports.importProducts = async (importContainerKey) => importApiRoot
  .productDrafts()
  .importContainers()
  .withImportContainerKeyValue({importContainerKey})
  .post({
    body: await createImportProductsDraft()
  })
  .execute();

const createImportProductsDraft = async () => {
  return {
    type: "product-draft",
    resources: await getProductDraftsArray(),
  };
};

const getProductDraftsArray = () => {
  // get data from csv
  // create product drafts array and send it back
  let productDraftsArray = [];
  let participantNamePrefix = "ff";
  return csvtojsonV2()
    .fromFile("./products.csv")
    .then((products) => {
      products.forEach((product) => {
        productDraftsArray.push({
          key: participantNamePrefix + "-" + product.productName,
          name: {
            "de": product.productName,
          },
          productType: {
            typeId: "product-type",
            key: product.productType,
          },
          slug: {
            "de": participantNamePrefix + "-" + product.productName,
          },
          description: {
            "de": product.description,
          },
          masterVariant: {
            sku: participantNamePrefix + "-" +product.inventoryId,
            key: participantNamePrefix + "-" +product.productName,
            prices: [
              {
                value: {
                  type: "centPrecision",
                  currencyCode: product.currencyCode,
                  centAmount: parseInt(product.basePrice),
                },
              },
            ],
            images: [
              {
                url: product.imageUrl,
                dimensions: { w: 177, h: 237 },
              },
            ],
          },
        });
      });
      return productDraftsArray;
    });
};
