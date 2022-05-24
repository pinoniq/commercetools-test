const { 
    createImportContainer,
    importProducts,
    checkImportSummary,
    checkImportOperations, 
    checkImportOperationById
    } = require("./handson/importService");
const { log } = require("./logger.js");

const containerKey = "jm-ImportContainer";

// Create an import container
// createImportContainer(containerKey).then(log).catch(log);

// import products
// importProducts(containerKey).then(log).catch(log);

// check import summary for your container
// checkImportSummary(containerKey).then(log).catch(log);

// check import operations for your container
/* checkImportOperations(containerKey).then(operations =>
   operations.body.results.forEach(operation =>
       log(operation.id + " : " +operation.state)
   )
)//*/

// Check the status of import operations by their Ids
checkImportOperationById("aa36faaa-f47b-4e39-b509-030500ad8092").then(log).catch(log);
//checkImportOperationById("ea97f27f-4e71-4851-957e-126490f6bc0a").then(log).catch(log);




// https://github.com/commercetools/commercetools-project-sync#run
// docker run \
// -e SOURCE_PROJECT_KEY=xxx \
// -e SOURCE_CLIENT_ID=xxx \
// -e SOURCE_CLIENT_SECRET=xxx \
// -e TARGET_PROJECT_KEY=xxx \
// -e TARGET_CLIENT_ID=xxx \
// -e TARGET_CLIENT_SECRET=xxx \
// commercetools/commercetools-project-sync:5.1.2 -s all
