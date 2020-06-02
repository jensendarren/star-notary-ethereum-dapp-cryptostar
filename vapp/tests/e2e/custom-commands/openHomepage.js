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

module.exports = {

  async command() {

    const provider = new PrivateKeyProvider(
      "8c8d57550b7f0d0d9410d842f3a9188d316e85a28daab498231e7577e863c643",
      "http://localhost:8545"
    );

    this.init()

    // this.window.web3 is undefined
    // how to inject the PrivateKeyProvider so
    // that these e2e tests can pass?
    console.log('this.window.web3', this.window.web3);


    this.waitForElementVisible('#app');
  },
};
