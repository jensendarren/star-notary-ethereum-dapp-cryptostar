<template>
  <div v-if="isDrizzleInitialized" id="app">
    <h1>StarNotary DAPP</h1>
    <Account />
    <h2>Create a Star</h2>
      <drizzle-contract-form
        contractName="StarNotary"
        method="createStar"
        :placeholders="['Star Name', 'Token ID']"
      />
    <h2>View a Star</h2>
      <!-- <p v-bind="getStarInfoFromTokenId"></p> -->
      <drizzle-contract
        contractName="StarNotary"
        method="lookUptokenIdToStarInfo"
        :methodArgs="['123124']"
        label="Star Info" />
  </div>
  <div v-else>
    Loading application...
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import Account from './components/Account.vue';

@Component({
  name: 'app',
  components: {
    Account,
  },
  computed: {
    ...mapGetters('drizzle', ['drizzleInstance', 'isDrizzleInitialized']),
    ...mapGetters('contracts', ['getContractData']),
  },
})
export default class App extends Vue {}
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
