<template>
  <div v-if="isDrizzleInitialized" id="app">
    <h1>StarNotary DAPP</h1>
    <h2>Create a Star</h2>
      <drizzle-contract-form
        contractName="StarNotary"
        method="createStar"
        :placeholders="['star']"
      />
      <!--
        <br><label for="starName">Star Name:</label><input type="text" id="starName"></input>
      <br><label for="starId">Star ID:</label><input type="text" id="starId"></input>
      <br><br><button id="createStar" onclick="App.createStar()">Create Star</button>

      await createStar(name, id).send({from: this.account});-->
  </div>
  <div v-else>
    Loading application...
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

@Component({
  name: 'app',
  computed: {
    ...mapGetters('drizzle', ['drizzleInstance', 'isDrizzleInitialized']),
    ...mapGetters('contracts', ['getContractData']),

    // getStarInfoFromTokenId() {
    //   let data = this.getContractData({
    //     contract: 'StarNotary',
    //     method: 'lookUptokenIdToStarInfo'
    //   });
    //   if (data === 'loading') return false;
    //   return data
    // },

    // utils() {
    //   return this.drizzleInstance.web3.utils
    // }
  },
})
export default class App extends Vue {
  // created() {
  //   this.$store.dispatch('drizzle/REGISTER_CONTRACT', {
  //     contractName: 'StarNotary',
  //     method: 'lookUptokenIdToStarInfo',
  //     methodArgs: [123123]
  //   })
  // }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
