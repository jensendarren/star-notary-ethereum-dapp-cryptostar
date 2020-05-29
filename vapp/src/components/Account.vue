<template>
  <v-card
    id="accounts"
    class="mx-auto"
    max-width="400"
  >
    <v-img
      class="white--text align-end"
      height="200px"
      src="@/assets/stars.jpg"
    >
      <v-card-title>Account</v-card-title>
      <v-card-subtitle class="pb-0">{{ activeAccount }}</v-card-subtitle>
    </v-img>

    <v-card-text class="text--primary">
      <div>Balance: </div>
      <div>{{ activeBalance }}</div>
    </v-card-text>
  </v-card>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

@Component({
  name: 'account',
  computed: {
    ...mapGetters('accounts', ['activeAccount', 'activeBalance']),
  },
})
export default class Account extends Vue {}
</script>

<style>

</style>
