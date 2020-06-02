<template>
  <div class="text-center ma-2">
    <v-snackbar v-model="show" color='primary'>
      {{ text }}
      <v-btn outlined icon color="primary" @click.native="show = false">
        <v-icon color='white'>mdi-thumb-up</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'StarBar',
})
export default class StarBar extends Vue {
  show = false;

  text = '';

  showMessage(message) {
    this.show = true;
    this.text = message;
  }

  contractEventHandler = ({ contractName, eventName, data }) => {
    const message = `${contractName} (${eventName}: ${data.name}, ${data.tokenId}, ${data.date})`;
    this.showMessage(message);
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
