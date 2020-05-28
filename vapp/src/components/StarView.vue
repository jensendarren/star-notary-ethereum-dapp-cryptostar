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
    <!-- <p v-if="getStarInfo"> {{ getStarInfo() }}</p> -->
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
    ...mapGetters('drizzle', ['drizzleInstance']),
  }
})
export default class StarView extends Vue {
  tokenId= '1111';
  name=''

  getStarInfo() {
    this.name = this.drizzleInstance
      .contracts.StarNotary
      .methods.lookUptokenIdToStarInfo
      .cacheCall(this.tokenId);

    // console.log(dataKey);

    // this.name = this.$store.state.contracts.StarNotary.methods.lookUptokenIdToStarInfo[dataKey].value;

    // const data = this.getContractData({
    //   contract: 'StarNotary',
    //   method: 'lookUptokenIdToStarInfo',
    //   methodArgs: [this.tokenId],
    // });
    // if (data === 'loading') return false;
    // return data
  }

  // created(){
  //   this.$store.dispatch('drizzle/REGISTER_CONTRACT', {
  //     contractName: 'StarNotary',
  //     method: 'lookUptokenIdToStarInfo',
  //     methodArgs: [this.tokenId],
  //   })
  // }
}
</script>

<style>
</style>
