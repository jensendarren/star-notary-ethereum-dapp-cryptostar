<template>
  <v-card
    class="mx-auto"
    max-width="400"
  >
    <v-img
      class="white--text align-end"
      height="200px"
      src="@/assets/stars.jpg"
    >
      <v-card-title>Read a Star</v-card-title>
      <v-card-subtitle class="pb-0">{{ name }}</v-card-subtitle>
    </v-img>

    <v-card-text class="text--primary">
      <form>
        <input
          v-model="tokenId"
          type="text"
          placeHolder="Star TokenId" />
        <button @click.prevent='getStarInfo'>Read Star</button>
      </form>
    </v-card-text>
  </v-card>
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

  name='Enter the Token ID to see your star name.';

  async getStarInfo() {
    this.name = await this.drizzleInstance
      .contracts.StarNotary
      .methods.lookUptokenIdToStarInfo(this.tokenId).call();
  }
}
</script>

<style>
</style>
