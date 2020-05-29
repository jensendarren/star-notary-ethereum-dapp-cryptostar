import StarNotary from '@/contracts/StarNotary.json';

const options = {
  web3: {
    block: false,
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:8545',
    },
  },
  // The contracts to monitor
  // Note it might be useful to include the 'fromBlock' option when
  // deploying to production to ensure the historical events can be handled
  //   {
  //     eventName: 'StarClaimedEvent',
  //     eventOptions: { fromBlock: 0 } // take the block when the contract was deployed
  //  }
  // Reference: https://medium.com/blockrocket/using-the-vue-drizzle-plugin-within-a-production-web3-dapp-d82539c6c53c
  contracts: [StarNotary],
  events: {
    StarNotary: ['StarClaimedEvent'],
  },
  polls: {
    // check accounts every 15 seconds
    accounts: 15000,
  },
};

export default options;
