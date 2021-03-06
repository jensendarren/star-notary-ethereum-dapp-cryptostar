# CryptoStar: A Star Notary Ethereum Dapp

[![Build Status](https://travis-ci.org/jensendarren/star-notary-ethereum-dapp-cryptostar.svg?branch=master)](https://travis-ci.org/jensendarren/star-notary-ethereum-dapp-cryptostar)

## A Star Notary Ethereum Dapp (CryptoStar). Written using Solidity, web3.js and the Truffle Webpack Box

This application makes use of ERC-721 token standards to make a cliam of ownership for specific stars in the night sky!

## Truffle version and OpenZeppelin version used in the project.

This project was built using the following framework versions:

* Truffle v5.1.14-nodeLTS.0 (core: 5.1.13)
* OpenZeppelin (openzeppelin-solidity) v2.1.2
* Solidity v0.5.16 (solc-js)
* Node v12.14.1
* Web3.js v1.2.1
* Truffle Assertions v0.9.2
* Drizzle Vue Plugin v0.1.1
* VueJS 2.6.11

## ERC-721 Token Name

The ERC-721 Token Name is **DJ Star Token**

## ERC-721 Token Symbol

ERC-721 Token Symbol is **DJST**

## Token Address on the Rinkeby Network

The Token Address of Token ID 1 on Rinkeby Network is: **0xa96762affa98bb7523227f9c5ae5bd1eaebea00c** and can be viewed on the Rinkeby Etherscan website [here](https://rinkeby.etherscan.io/token/0xa96762affa98bb7523227f9c5ae5bd1eaebea00c)

ERC-721 Token Contract Address is: **0xa96762aFFA98bB7523227f9c5Ae5bD1eaebEa00C** and can be viewd on the Rinkeby Etherscan website [here](https://rinkeby.etherscan.io/address/0xa96762affa98bb7523227f9c5ae5bd1eaebea00c).

## Run the application

To run the backend local development Ethereum Blockchain using Truffle, simply run:

```
npm install
touch .secret
ganache-cli -m 'theme narrow finger canal enact photo census miss economy hotel often'

```

Note that optionally you can pass in `-i PORT` and `-b blockrate` to `ganache-cli`.

In a new terminal window, compile and migrate the contracts (so that you can interact with them in the front end later) and also run the tests. The script below also installs and runs the Vue JS application:

```
truffle compile
truffle test
truffle migrate --reset
cd app
npm install
npm run serve
```

### IPFS

You will also need to run a local IPFS daemon so that the Vue JS app can send uploaded pictures of the star to store there. Note you will need to allow cross origin:

```
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'
ipfs daemon
```

### Application screen shots and flow

__Initial view of application__

<img src="./img/1-inital-app-view.png" alt="drawing" width="400"/>

__Claim a star__

<img src="./img/2-claiming-a-star.png" alt="drawing" width="400"/>

__Star climed__

<img src="./img/3-star-claimed-notifcation.png" alt="drawing" width="400"/>

__Sell a Star__

<img src="./img/4-sell-star.png" alt="drawing" width="400"/>

__Buy a Star without sufficient Ether__

<img src="./img/5-buy-a-star-without-sufficient-ether.png" alt="drawing" width="400"/>

__Not enough ether error reported in Ganache__

<img src="./img/6-error-reported-in-ganache.png" alt="drawing" width="400"/>

### Travis CI Setup

Thanks to [this post](https://blog.coinfabrik.com/test-solidity-smart-contracts-using-travis-ci/) from [coinfabrik.com](coinfabrik.com)

### Issue Reporting

If you experience with bugs or need further improvement, please create a new issue under [Issues](https://github.com/jensendarren/star-notary-ethereum-dapp-cryptostar/issues).

### Contributing to the Star Notary App!

Pull requests are very welcome. Before submitting a pull request, please make sure that your changes are well tested. Pull requests without tests will not be accepted. In this project we currently use Jest and Supertest.

### Authors

This **Star Notary Ethereum Dapp** application was developed as part of the Blockchain Nanodegree with [Udacity](http://www.udacity.com) and [Darren Jensen](http://www.tweetegy.com).

### License

This **Star Notary Ethereum Dapp** application is released under [AGPL](http://www.gnu.org/licenses/agpl-3.0-standalone.html)

### Disclaimer

This application is part of a _project assignment_ and is most definitely __not__ suitable for Production use! :)

### Remaining issues / ideas

* Get e2e tests working by injecting web3: https://github.com/trufflesuite/drizzle/issues/91
* Deploy static Drizzle / VueJS Dapp to free host: https://www.netlify.com/
* Deploy updated contracts to testnet
* Deploy e2e tests Travis CI
* Emit a new owner event for when a star is sold and show in app using the StarBar component
* Reuse contracts object in the mocking for all unit specs
* Use sinon instead of a native promise to return the star name in the unit test
* Integrate https://tool.smartdec.net/
* Add validation to the Read a Star component
* Update the app ico icon and app title tag
* Clean up layout of the app, fix spacing, responsiveness, form rendering, button rendering and so on
* Add the new fields to Read Star
* Add screen captures to repository README
* Use the dataKey in cacheSend to display the transaction status.
* Show the validation messages around the corresponding form fields
* Add a footer to the web ui
* Check the output `GET http://192.168.0.149:8080/sockjs-node/info?t=1590735244963 net::ERR_ADDRESS_UNREACHABLE` in console
