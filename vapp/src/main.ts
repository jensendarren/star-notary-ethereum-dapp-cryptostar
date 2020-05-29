import Vue from 'vue';
import drizzleVuePlugin from '@drizzle/vue-plugin';
import Toasted from 'vue-toasted';
import App from './App.vue';
import store from './store';
import drizzleOptions from './drizzleOptions';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

Vue.use(drizzleVuePlugin, { store, drizzleOptions });
Vue.use(Toasted);

new Vue({
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
