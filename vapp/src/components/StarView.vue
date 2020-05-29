<template>
  <div>
    <h2>Read a Star</h2>
    <form>
      <input
        v-model="tokenId"
        type="text"
        placeHolder="Star TokenId" />
      <button @click.prevent='getStarInfo'>Read Star</button>
    </form>
    <h3>{{name}}</h3>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

@Component({
  name: 'StarView',
  computed: {
    ...mapGetters('contracts', ['getContractData']),
    ...mapGetters('drizzle', ['drizzleInstance', 'drizzleState']),
  },
})
export default class StarView extends Vue {
  tokenId= '';

  name='';

  async getStarInfo() {
    this.name = await this.drizzleInstance
      .contracts.StarNotary
      .methods.lookUptokenIdToStarInfo(this.tokenId).call();
  }
}
</script>

<style>
</style>
