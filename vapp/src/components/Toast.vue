<template>
  <section></section>
</template>

<script>
import { Vue } from 'vue-property-decorator';

export default class Toast extends Vue {
  contractEventHandler = ({ contractName, eventName, data }) => {
    const display = `${contractName} (${eventName}: ${data.name}, ${data.tokenId}, ${data.date})`;
    const subObtions = { duration: 3000 };
    this.$toasted.show(display, subObtions);
  };

  mounted() {
    this.$drizzleEvents.$on('drizzle/contractEvent', (payload) => {
      this.contractEventHandler(payload);
    });
  }
}
</script>

<style>
</style>
