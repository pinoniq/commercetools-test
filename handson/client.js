const { createAuthMiddlewareForClientCredentialsFlow } = require('@commercetools/sdk-middleware-auth');
const { createHttpMiddleware } = require ('@commercetools/sdk-middleware-http')
const { createClient } = require ('@commercetools/sdk-client')
const {
  createApiBuilderFromCtpClient,
  ApiRoot,
} = require ('@commercetools/typescript-sdk')

const {
  createApiBuilderFromCtpClient : createApiBuilderFromCtpClientOnlyForImports,
  ApiRoot : ApiRootOnlyForImports,
} = require ('@commercetools/importapi-sdk')

const fetch = require ('node-fetch');

const projectKey = 'training-fady-24-7'



const getClient = () => { 
  const authMiddleware = createAuthMiddlewareForClientCredentialsFlow({
    host: 'https://auth.europe-west1.gcp.commercetools.com',
    projectKey,
    credentials: {
      clientId: '2REUzyqvS5XPDyg0fMWRhImS',
      clientSecret: 'S1GeVbB_IVuuUt3q3vElBFW37dHZI2bk',
    },
    fetch,
  })
  
  const httpMiddleware = createHttpMiddleware({
    host: 'https://api.europe-west1.gcp.commercetools.com',
    fetch,
  })
  
  const ctpClient = createClient({
    middlewares: [authMiddleware, httpMiddleware],
  })
  return ctpClient;
}

const getMLClient = () => { }

const getMyAPIClient = () => { }

const apiRoot = createApiBuilderFromCtpClient(getClient());

const importApiRoot = createApiBuilderFromCtpClientOnlyForImports(getClient());

module.exports.apiRoot = apiRoot;
module.exports.importApiRoot = importApiRoot;
module.exports.getClient = getClient;
module.exports.projectKey = projectKey;
module.exports.getMLClient = getMLClient;
module.exports.getMyAPIClient = getMyAPIClient;
