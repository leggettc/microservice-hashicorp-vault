const sdk = require('@skinternal/skconnectorsdk')
const {serr, compileErr, logger} = require('@skinternal/skconnectorsdk')
const {
  hashicorpVaultGetSecret,
} = require('./capabilities');

const redisList = 'hashicorp-vault'

const registerCapabilities = () => {
  sdk.methods.handle_capability_hashicorpVaultGetSecreet = hashicorpVaultGetSecret;

}

/**
 * Initialize is the main function to start this service. It initializes sdk with name of the connector.
 */
const initialize = async () =>{
  try {
    registerCapabilities();
    const response = await sdk.initalize(redisList)
    console.log(response)
    logger.info('Started microservice-hashicorp-vault');
  } catch(err){
    console.log(err);
    logger.error('Error starting microservice-hashicorp-vault');
  }
}

initialize();
