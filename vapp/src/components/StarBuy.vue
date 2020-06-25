<template>
  <v-card
    id='starBuyCard'
    class="mx-auto"
    max-width="400"
  >
    <v-img
        class="white--text align-end"
        height="200px"
        src="@/assets/stars.jpg"
      >
        <v-card-title>Buy a star</v-card-title>
        <v-card-subtitle class="pb-0">Complete the form below to buy your star!</v-card-subtitle>
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
          label="Price (in Ether)"
          v-model="price"
          type="number"
        ></v-text-field>
        <v-btn id='btnBuyStar'
                @click.native='onSubmit'
                outlined
                color='primary'>
          Buy Star
        </v-btn>
      </form>
    </v-card-text>
  </v-card>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

@Component({
  name: 'StarBuy',
  computed: {
    ...mapGetters('drizzle', ['drizzleInstance']),
  },
})
export default class StarBuy extends Vue {
  tokenId='';

  price = '';

  errors= [];

  onSubmit() {
    if (this.validate()) {
      this.drizzleInstance
        .contracts.StarNotary
        .methods.buyStar
        .cacheSend(this.tokenId, { value: this.drizzleInstance.web3.utils.toWei(this.price, 'ether') });
    }
  }

  validate() {
    this.errors = [];

    if (this.tokenId) {
      return true;
    }

    if (!this.tokenId) {
      this.errors.push('Token Id required.');
    }

    return this.errors.length === 0;
  }
}
</script>

<style>

</style>
