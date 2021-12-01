const vaultUtils = require('./common/vaultUtils');
const {logger} = require('@skinternal/skconnectorsdk')

const axios = require('axios');
const url = require('url');

const hashicorpVaultStoreSecret = async ({companyId,flowId,interactionId,parameters,properties}) => {

    try {
    
        const {
            hvHostNameConnectionProperty,
            hvUsernameConnectionProperty,
            hvPasswordConnectionProperty,
            hvSecretPathProperty,
            hvSecretNameProperty,
            hvSecretDataProperty } = properties;

        var res = await vaultUtils.getVaultToken(hvHostNameConnectionProperty, hvUsernameConnectionProperty, hvPasswordConnectionProperty);

        const authBody = res.data;
        const vaultToken = authBody.auth.client_token;

        var res = await createSecret(hvHostNameConnectionProperty, vaultToken, hvSecretPathProperty, hvSecretNameProperty, hvSecretDataProperty )



        return {
            output: {
                secretVersion: hvSecretNameProperty,
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
        throw compileErr('storeSecret', err);
        }
}

const createSecret = async ( vaultBaseURL, vaultAuthToken, secretPath, secretName, secretData ) => {

    const vaultSecretURL = vaultBaseURL + "/v1/secret/data/" + secretPath + "/" + secretName;    

    return axios.post(vaultSecretURL, secretData, { headers: { "X-VAULT-TOKEN": vaultAuthToken } });

}

module.exports = {
    hashicorpVaultStoreSecret,
};