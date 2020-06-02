<template>
  <v-card
    id='starSellCard'
    class="mx-auto"
    max-width="400"
  >
    <v-img
        class="white--text align-end"
        height="200px"
        src="@/assets/stars.jpg"
      >
        <v-card-title>Sell a star</v-card-title>
        <v-card-subtitle class="pb-0">Complete the form below to sell your star!</v-card-subtitle>
    </v-img>
    <v-card-text class="text--primary">
      <form>
        <p v-if="errors.length">
          <b>Please correct the following error(s):</b>
          <ul>
            <li v-for="error in errors" v-bind:key="error.id">{{ error }}</li>
          </ul>
        </p>
        <v-text-field
          id="fieldTokenId"
          label="Token Id"
          v-model="tokenId"
          type="number"
        ></v-text-field>
        <v-text-field
          id="fieldPrice"
          label="Set Price"
          v-model="price"
          type="number"
        ></v-text-field>
        <v-btn id='btnSellStar'
                @click.native='onSubmit'
                outlined
                color='primary'>
          Sell Star
        </v-btn>
      </form>
    </v-card-text>
  </v-card>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

@Component({
  name: 'StarSell',
  computed: {
    ...mapGetters('drizzle', ['drizzleInstance']),
  },
})
export default class StarSell extends Vue {
  tokenId='';

  price='';

  errors= [];

  onSubmit() {
    if (this.validate()) {
      this.drizzleInstance
        .contracts.StarNotary
        .methods.putStarUpForSale
        .cacheSend(this.tokenId, this.price);
    }
  }

  validate() {
    this.errors = [];

    if (this.tokenId && this.price) {
      return true;
    }

    if (!this.tokenId) {
      this.errors.push('Token Id required.');
    }

    if (!this.price) {
      this.errors.push('Price required.');
    }

    return this.errors.length === 0;
  }
}
</script>

<style>

</style>
