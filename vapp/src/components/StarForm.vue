<template>
  <div>
    <h2>Claim a new Star</h2>
    <form>
      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors" v-bind:key="error.id">{{ error }}</li>
        </ul>
      </p>
      <p>
        <label for="name">Name </label>
        <input
          v-model="name"
          type="text"
          placeHolder="Star Name"
          required=true />
      </p>
      <p>
        <label for="tokenId">Token Id </label>
        <input
          v-model="tokenId"
          type="number"
          placeHolder="Token ID" />
      </p>
      <p>
        <label for="declination">Declination </label>
        <input
          v-model="declination"
          type="number"
          placeHolder="Declination" />
      </p>
      <p>
        <label for="magnitude">Magnitude </label>
        <input
          v-model="magnitude"
          type="number"
          placeHolder="Magnitude" />
      </p>
      <p>
        <label for="selectedConstellation">Constellation </label>
        <select id="selectConstellation" v-model="constellation" size="1">
          <option selected disabled id=0>Choose Constellation</option>
          <option v-for="constellation in constellations"
                  v-bind:key="constellation.id"
                  :id=constellation.id>
                  {{ constellation.name }}
          </option>
        </select>
      </p>
      <button @click.prevent='onSubmit'>Create Star</button>
    </form>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import constellationData from '../store/constellationData.json';

@Component({
  name: 'StarForm',
  computed: {
    ...mapGetters('drizzle', ['drizzleInstance']),
  },
})
export default class StarForm extends Vue {
  name='';
  tokenId='';
  constellation=0;
  declination=null;
  magnitude=null;
  constellations=constellationData;
  errors= [];

  onSubmit() {
    if (this.validate()) {
      this.drizzleInstance
        .contracts.StarNotary
        .methods.createStar
        .cacheSend(this.name, this.tokenId, this.declination, this.magnitude);
    }
  }

  validate() {
    this.errors = [];

    if (this.name && this.tokenId) {
      return true;
    }

    if (!this.name) {
      this.errors.push('Name required.');
    }
    if (!this.tokenId) {
      this.errors.push('Token Id required.');
    }

    return this.errors.length == 0;
  }
}
</script>

<style>
  label { font-weight: bold; }
</style>
