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
      <v-card-subtitle id="name" class="pb-0">{{ name }}</v-card-subtitle>
    </v-img>

    <v-card-text class="text--primary">
      <form>
        <v-text-field
          label="Star TokenId"
          v-model="tokenId"
          type="text"
        ></v-text-field>
        <v-btn id='btnGetStarInfo' @click.native='getStarInfo'
                outlined
                color='primary'>
          Read Star
        </v-btn>
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
