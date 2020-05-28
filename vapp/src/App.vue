<template>
  <div v-if="isDrizzleInitialized" id="app">
    <h1>StarNotary Dapp</h1>
    <Account />
    <StarForm />
    <StarView />
  </div>
  <div v-else>
    Loading application...
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import Account from './components/Account.vue';
import StarView from './components/StarView.vue';
import StarForm from './components/StarForm.vue';

@Component({
  name: 'app',
  components: {
    Account,
    StarView,
    StarForm,
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
