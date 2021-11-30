//const vaultUtils = require('./common/vaultUtils');
const {logger} = require('@skinternal/skconnectorsdk')

const axios = require('axios');
const url = require('url');

/**
 * hashicorpVaultGetSecret - Hashicorp Vault Connector - Get Secret capability
 * *
 * Take the following configuration
 *   vaultHostName          https://vault.example.com
 *   vaultSecretBasePath    /secrets
 *   username               bob
 *   password               your_super_strong_password
 *   secretname             secret_1
 *
 * Take the following input schema elements
 *   secreetname
 *
 * Returns the following output schema elements
 *    secretvalue
 *
 */

const hashicorpVaultGetSecret = async ({companyId,flowId,interactionId,parameters,properties}) => {
    try {


        const {
            hvHostNameConnectionProperty,
            hvSecretPathConnectionProperty,
            hvUsernameConnectionProperty,
            hvPasswordConnectionProperty } = properties;

            var res = await getVaultToken(hvHostNameConnectionProperty, hvUsernameConnectionProperty, hvPasswordConnectionProperty);

            const body = res.data;
            const vaulttoken = body.auth.client_token;

            console.log("....Retrieved the Vault Token....");
            console.log("Vault Token: " + vaulttoken);

    return {
        output: {
        secretName: secretName,
        secretValue: secretValue
        }
    }
    } catch (err) {
    if (err.response && err.response.status === 404) {
        return {
        output: {
            rawResponse: {},
        },
        eventName: 'continue',
        };
    }
    throw compileErr('authenticateUser', err);
    }
}

const getVaultToken = async (vaultBaseURL, username ,password) => {

    const params = {
        "password": password
    };
  
    return axios.post(vaultBaseURL + "/v1/auth/userpass/login/" + username,
      {
        params: params
    })
  }
