const sdk = require('@skinternal/skconnectorsdk')
const {serr, compileErr, logger} = require('@skinternal/skconnectorsdk')
const redisList = 'hashicorp-vault'

sdk.methods.handle_capability_start = async (input) =>{
  // do something here
  console.log(input)
}

/**
 * Initialize is the main function to start this service. It initializes sdk with name of the connector.
 */
const initialize = async () =>{
  try {
    const response = await sdk.initalize(redisList)
    console.log(response)
    logger.info('Started microservice-hashicorp-vault');
  } catch(err){
    console.log(err);
    logger.error('Error starting microservice-hashicorp-vault');
  }
}

initialize();
