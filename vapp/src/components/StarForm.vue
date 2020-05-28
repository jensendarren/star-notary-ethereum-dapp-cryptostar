<template>
  <div>
    <h2>Claim a new Star</h2>
    <form>
      <input
        v-model="name"
        type="text"
        placeHolder="Star Name" />
      <input
        v-model="tokenId"
        type="text"
        placeHolder="Token ID" />
      <button @click.prevent='onSubmit'>Create Star</button>
    </form>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

@Component({
  name: 'StarForm',
  computed: {
    ...mapGetters('drizzle', ['drizzleInstance']),
  },
})
export default class StarForm extends Vue {
  name='';

  tokenId='';

  onSubmit() {
    this.drizzleInstance
      .contracts.StarNotary
      .methods.createStar
      .cacheSend(this.name, this.tokenId);
  }
}
</script>

<style>
</style>
