import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/es5/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    light: {
      primary: '#123123',
    },
    dark: {
      primary: '#321321',
    },
  },
});
