const {
  createClient,
  createHttpClient,
  createAuthForClientCredentialsFlow,
  createAuthForPasswordFlow
} = require ('@commercetools/sdk-client-v2')
const { createApiBuilderFromCtpClient } = require('@commercetools/platform-sdk')

const {
  createApiBuilderFromCtpClient: createApiBuilderFromCtpClientOnlyForImports,
} = require("@commercetools/importapi-sdk");
require("dotenv").config();

const fetch = require("node-fetch");

const projectKey = process.env.CTP_PROJECT_KEY;

//use .env for credentials process.env.adminClientId 

const getClient = () => {
  const authMiddleWare = createAuthForClientCredentialsFlow({
    host: process.env.CTP_AUTH_URL,
    projectKey,
    credentials: {
      clientId: process.env.CTP_CLIENT_ID,
      clientSecret: process.env.CTP_CLIENT_SECRET
    },
    fetch
  });

  const httpMiddleWare = createHttpClient({
    host: process.env.CTP_API_URL,
    fetch,
  })

  return createClient({
    middlewares: [authMiddleWare, httpMiddleWare]
  })
};

const getImportClient = () => {
  const authMiddleWare = createAuthForClientCredentialsFlow({
    host: process.env.CTP_IMPORT_AUTH_URL,
    projectKey,
    credentials: {
      clientId: process.env.CTP_IMPORT_CLIENT_ID,
      clientSecret: process.env.CTP_IMPORT_CLIENT_SECRET
    },
    fetch
  });

  const httpMiddleWare = createHttpClient({
    host: process.env.CTP_IMPORT_API_URL,
    fetch,
  })

  return createClient({
    middlewares: [authMiddleWare, httpMiddleWare]
  })
};

const getStoreClient = () => {
  const authMiddleWare = createAuthForPasswordFlow({
    host: process.env.CTP_STORE_AUTH_URL,
    projectKey,
    credentials: {
      clientId: process.env.CTP_STORE_CLIENT_ID,
      clientSecret: process.env.CTP_STORE_CLIENT_SECRET,
      user: {
        username: "jmeeus@reference.com",
        password: "password",
      }
    },
    fetch
  });

  const httpMiddleWare = createHttpClient({
    host: process.env.CTP_STORE_API_URL,
    fetch,
  })

  return createClient({
    middlewares: [authMiddleWare, httpMiddleWare]
  })
};

const getMLClient = () => {};

const getMyAPIClient = () => {
  const authMiddleWare = createAuthForClientCredentialsFlow({
    host: process.env.CTP_MY_STORE_AUTH_URL,
    projectKey,
    credentials: {
      clientId: process.env.CTP_MY_STORE_CLIENT_ID,
      clientSecret: process.env.CTP_MY_STORE_CLIENT_SECRET
    },
    fetch
  });

  const httpMiddleWare = createHttpClient({
    host: process.env.CTP_MY_STORE_API_URL,
    fetch,
  })

  return createClient({
    middlewares: [authMiddleWare, httpMiddleWare]
  })
};

module.exports.apiRoot = createApiBuilderFromCtpClient(getClient()).withProjectKey({ projectKey, });

module.exports.importApiRoot = createApiBuilderFromCtpClientOnlyForImports(
  getImportClient()
).withProjectKeyValue({ projectKey, });

module.exports.storeApiRoot = createApiBuilderFromCtpClient(getStoreClient()).withProjectKey({ projectKey, });

module.exports.myApiRoot = createApiBuilderFromCtpClient(getMyAPIClient()).withProjectKey({ projectKey, });
module.exports.projectKey = projectKey;