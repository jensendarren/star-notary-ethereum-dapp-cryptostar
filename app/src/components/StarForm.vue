<template>
  <v-card
    id='starFormCard'
    class="mx-auto"
    max-width="400"
  >
    <v-img
        class="white--text align-end"
        height="200px"
        src="@/assets/stars.jpg"
      >
        <v-card-title>Claim a new Star</v-card-title>
        <v-card-subtitle class="pb-0">Complete the form below to claim your star!</v-card-subtitle>
    </v-img>
    <v-card-text class="text--primary">
      <form enctype="multipart/form-data">
        <p v-if="errors.length">
          <b>Please correct the following error(s):</b>
          <ul>
            <li v-for="error in errors" v-bind:key="error.id">{{ error }}</li>
          </ul>
        </p>
        <v-text-field
          id="fieldName"
          label="Star Name"
          v-model="name"
          type="text"
          required=true
        ></v-text-field>
        <v-text-field
          id="fieldTokenId"
          label="Token Id"
          v-model="tokenId"
          type="number"
        ></v-text-field>
        <v-text-field
          id="fieldDeclination"
          label="Declination"
          v-model="declination"
          type="number"
        ></v-text-field>
        <v-text-field
          id="fieldMagnitude"
          label="Magnitude"
          v-model="magnitude"
          type="number"
        ></v-text-field>
        <p>
          <v-select
            :items="constellations"
            item-text="name"
            item-value="id"
            label="Constellation"
          ></v-select>
        </p>
        <p>
          <input  type="file"
                  @change="handleFileChange"
                  accept="image/*"/>
        </p>
        <p>{{ starCid }}</p>
        <v-btn id='btnCreateStar'
                @click.native='onSubmit'
                outlined
                color='primary'>
          Create Star
        </v-btn>
      </form>
    </v-card-text>
  </v-card>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import constellationData from '../store/constellationData.json';
import ipfs from '../store/ipfs';

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

  starCid='';

  ipfsService=ipfs;

  handleFileChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      this.$store.state.buffer = Buffer.from(reader.result);
    };
  }

  async onSubmit() {
    if (this.validate()) {
      let res;
      if (this.$store.state.buffer) {
        res = await this.ipfsService.add(this.$store.state.buffer);
      }
      this.starCid = res.cid.string;
      this.drizzleInstance
        .contracts.StarNotary
        .methods.createStar
        .cacheSend(this.name,
          this.tokenId,
          this.declination,
          this.magnitude,
          this.starCid);
    }
    // reset the store buffer and cid
    this.$store.state.buffer = null;
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

    return this.errors.length === 0;
  }
}
</script>

<style>
</style>
