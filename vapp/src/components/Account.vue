<template>
  <div id="accounts">
    <h2>Accounts</h2>
    <div>{{ activeAccount }}</div>
    <div>Balance: {{ activeBalance }}</div>
  </div>
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
