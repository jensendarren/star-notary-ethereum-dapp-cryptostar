<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="@/assets/star-icon.jpg"
          transition="scale-transition"
          width="40"
        />

        <h1>Star Notary Service</h1>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/jensendarren/star-notary-ethereum-dapp-cryptostar"
        target="_blank"
        text
      >
        <span class="mr-2">Github Repo</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <div v-if="isDrizzleInitialized" id="app">
      <v-container>
        <v-row no-gutters>
          <v-col
            cols="12"
            sm="4"
          >
            <Account />
          </v-col>
          <v-col
            cols="12"
            sm="4"
          >
            <StarForm />
          </v-col>
          <v-col
            cols="12"
            sm="4"
          >
            <StarView />
          </v-col>
        </v-row>
      </v-container>
      <Toast />
    </div>
    <div v-else>
      Loading application...
    </div>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import Account from './components/Account.vue';
import StarView from './components/StarView.vue';
import StarForm from './components/StarForm.vue';
import Toast from './components/Toast.vue';

@Component({
  name: 'app',
  components: {
    Account,
    StarView,
    StarForm,
    Toast,
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
  color: #d8e3ee;
  margin-top: 60px;
}
</style>
