const axios = require('axios');
const {logger, serr} = require('@skinternal/skconnectorsdk');

const getVaultToken = async (vaultBaseURL, username ,passValue) => {

    const postData = JSON.stringify({
        password: "2FederateM0re!"
    });
  
    const headers = {
        'Content-Type': 'application/json'
    };      
    const vaultLoginURL = vaultBaseURL + "/v1/auth/userpass/login/" + username;

    console.log("Vault URL:" + vaultLoginURL);
    console.log(postData);
    return axios.post( vaultLoginURL, postData, {
        headers: headers
      })
  }

  module.exports = {
    getVaultToken,
  };