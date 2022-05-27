const { apiRoot, projectKey } = require("./handson/client.js");
const { log } = require("./logger");


const query = `
query {
    orders {
      results {
        customer {
          email
        }
        lineItems {
          nameAllLocales {
            value
          }
        }
        totalPrice {
          centAmount
        }
      }
    }
  }
  `;

apiRoot.graphql().post({
  body: {
    query,
  }
}).execute().then(log).catch(log);