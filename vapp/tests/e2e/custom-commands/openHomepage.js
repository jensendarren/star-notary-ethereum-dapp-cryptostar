/**
 * A basic Nightwatch custom command
 *  which demonstrates usage of ES6 async/await instead of using callbacks.
 *  The command name is the filename and the exported "command" function is the command.
 *
 * Example usage:
 *   browser.openHomepage();
 *
 * For more information on writing custom commands see:
 *   https://nightwatchjs.org/guide/extending-nightwatch/#writing-custom-commands
 *
 */

const PrivateKeyProvider = require("truffle-privatekey-provider");
const Web3 = require("web3");

module.exports = {

  async command() {
    this.init();

    // NOTE: Unfortunately this does not work since Drizzle has already
    // initialized and is using the fallback option. So I still
    // need to gigure out how to set a custom provider when using Drizzle
    // https://github.com/trufflesuite/drizzle/issues/91
    this.execute(function() {
      return window.web3;
    }, [], function(result) {
      const provider = new PrivateKeyProvider(
        "8c8d57550b7f0d0d9410d842f3a9188d316e85a28daab498231e7577e863c643",
        "http://localhost:8545"
      );
      result.value = new Web3(provider);
    })

    this.waitForElementVisible('#app')
  },
};
