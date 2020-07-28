import { expect } from 'chai';
import { createLocalVue, shallowMount, mount } from '@vue/test-utils';
import StarForm from '@/components/StarForm.vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import sinon from 'sinon';

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(Vuetify);

describe('StarForm.vue', () => {
  let store: any;
  const star = 'A new star!';
  const tokenId = '9899112';
  const ifpsCid = 'QmXypEvNBbJKtRukk6oFpA8RqvtsiamqjnEX8qz6vTaJ3m';
  let wrapper: any;

  // Mock the drizzle contracts so that the call is made
  const contracts = {
    contracts: {
      StarNotary: {
        methods: {
          createStar: {
            cacheSend: (name: string,
              id: string,
              declination: number,
              magnitude: number,
              cid: string) => true,
          },
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
    wrapper = shallowMount(StarForm, { localVue, store });
  });

  it('renders with a default form and message', () => {
    expect(wrapper.text()).to.contain('Claim a new StarComplete the form below to claim your star!');
  });

  it('displays validation message when name and token is not entered', async () => {
    const btn = wrapper.find('#btnCreateStar');
    await btn.trigger('click');
    expect(wrapper.text()).to.contain('Please correct the following error(s):Name required.Token Id required.');
  });

  it('should call the createStar.cacheSend function and pass in the expected params', async () => {
    // Set the tokenId on the components data collection to a known value
    wrapper.vm.$data.name = star;
    wrapper.vm.$data.tokenId = tokenId;
    wrapper.vm.$data.declination = 1;
    wrapper.vm.$data.magnitude = 2;
    wrapper.vm.$data.cid = ifpsCid;
    // Spy on the lookUptokenIdToStarInfo function call
    const spy = sinon.spy(contracts.contracts.StarNotary.methods.createStar, 'cacheSend');
    // Find the getStarInfo button and click it
    const button = wrapper.find('#btnCreateStar');
    await button.trigger('click');
    // Assert that the lookUptokenIdToStarInfo was called once with the expected tokenId
    expect(spy.calledOnce).to.eq(true);
    expect(spy.calledWith(star, tokenId, 1, 2, '')).to.eq(true);
  });
});
