import { expect } from 'chai';
import { createLocalVue, shallowMount, mount } from '@vue/test-utils';
import StarView from '@/components/StarView.vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import sinon from 'sinon';

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(Vuetify);

describe('StarView.vue', () => {
  const name = 'Enter the Token ID to see your star name.';
  let store: any;
  const star = 'A new star!';
  const tokenId = '9899112';
  let wrapper: any;

  // Note: requestAnimationFrame is defined here due to this issue
  // https://github.com/vuejs/vue-test-utils/issues/974
  // which occurs due to haveing to use mount for issue below!
  const requestAnimationFrame = (fn: Function) => fn();
  globalThis.requestAnimationFrame = requestAnimationFrame;

  // Mock web3 call() function to return a Promise that returns the star name
  const call = () => new Promise((resolve) => resolve(star));

  // Mock the drizzle contracts so that the call is made
  const contracts = {
    contracts: {
      StarNotary: {
        methods: {
          lookUptokenIdToStarInfo: (id: string) => call,
        },
      },
    },
  };

  beforeEach(() => {
    // Mock the Vuex store drizzle namespace getters to return the expected drizzleInstance
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

  it('renders the star name when button clicked', async () => {
    const button = wrapper.find('#btnGetStarInfo');
    await button.trigger('click');
    expect(wrapper.find('#name').text().trim()).to.eq(star);
  });

  it('updates the components tokenId data when the text field is updated', async () => {
    // Note: have to use mount here due to this issue:
    // https://github.com/vuejs/vue-test-utils/issues/957
    wrapper = mount(StarView, { localVue, store });
    const textInput = wrapper.find('#fieldTokenId');
    textInput.setValue(tokenId);
    expect(wrapper.vm.$data.tokenId).to.eq(tokenId);
  });

  it('should call the lookUptokenIdToStarInfo function and pass in the tokenID', async () => {
    // Set the tokenId on the components data collection to a known value
    wrapper.vm.$data.tokenId = tokenId;
    // Spy on the lookUptokenIdToStarInfo function call
    const spy = sinon.spy(contracts.contracts.StarNotary.methods, 'lookUptokenIdToStarInfo');
    // Find the getStarInfo button and click it
    const button = wrapper.find('#btnGetStarInfo');
    await button.trigger('click');
    // Assert that the lookUptokenIdToStarInfo was called once with the expected tokenId
    expect(spy.calledOnce).to.eq(true);
    expect(spy.calledWith(tokenId)).to.eq(true);
  });
});
