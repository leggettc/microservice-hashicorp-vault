const vaultUtils = require('./common/vaultUtils');
const {logger} = require('@skinternal/skconnectorsdk')

const axios = require('axios');
const url = require('url');

/**
 * hashicorpVaultGetSecret - Hashicorp Vault Connector - Get Secret capability
 * *
 * Take the following configuration:
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

        logger.info(properties);

        const {
            hvHostNameConnectionProperty,
            hvUsernameConnectionProperty,
            hvPasswordConnectionProperty,
            hvSecretPathProperty,
            hvSecretNameProperty,
            hvSecretVersionProperty } = properties;

        var res = await vaultUtils.getVaultToken(hvHostNameConnectionProperty, hvUsernameConnectionProperty, hvPasswordConnectionProperty);

        // extract the vault token
        const authBody = res.data;
        const vaultToken = authBody.auth.client_token;

        var res = await getSecret(hvHostNameConnectionProperty, vaultToken, hvSecretPathProperty, hvSecretNameProperty, hvSecretVersionProperty )
        const secretBody = res.data.data;

    return {
        output: {
            secretName: hvSecretNameProperty,
            secretData: secretBody
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
    throw compileErr('getSecret', err);
    }
}

const getSecret = async ( vaultBaseURL, vaultAuthToken, secretPath, secretName, vaultVersion ) => {

    var vaultSecretURL = vaultBaseURL + "/v1/secret/data/" + secretPath + "/" + secretName;

    if(vaultVersion != null){
        vaultSecretURL = vaultSecretURL + "?version=" + vaultVersion;
    }

    return axios.get(vaultSecretURL, { headers: { "X-VAULT-TOKEN": vaultAuthToken } });

}


module.exports = {
    hashicorpVaultGetSecret,
};
