import { expect } from 'chai';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import StarView from '@/components/StarView.vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(Vuetify);

describe('StarView.vue', () => {
  const name = 'Enter the Token ID to see your star name.';
  let store: any;
  let wrapper: any;
  const star = 'A new star!';
  // Mock web3 call() function to return a Promise that returns the star name
  const call = () => new Promise((resolve) => resolve(star));

  const contracts = {
    contracts: {
      StarNotary: {
        methods: {
          lookUptokenIdToStarInfo: () => call,
        },
      },
    },
  };

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        drizzle: {
          namespaced: true,
          getters: {
            drizzleInstance: () => contracts,
          },
        },
      },
    });

    wrapper = shallowMount(StarView, { localVue, store });
  });

  it('renders with a default form and message', () => {
    expect(wrapper.find('#name').text().trim()).to.eq(name);
  });

  it('renders the star name when button clicked and a token Id is set', async () => {
    const button = wrapper.find('#btnGetStarInfo');
    await button.trigger('click');
    expect(wrapper.find('#name').text().trim()).to.eq(star);
  });
});
