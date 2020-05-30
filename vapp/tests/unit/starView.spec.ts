import { expect } from 'chai';
import { createLocalVue, shallowMount, mount } from '@vue/test-utils';
import StarView from '@/components/StarView.vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(Vuetify);

describe('StarView.vue', () => {
  const name = 'Enter the Token ID to see your star name.';
  let store: any;
  // let wrapper: any;
  const star = 'A new star!';

  const requestAnimationFrame = (fn: Function) => fn();
  globalThis.requestAnimationFrame = requestAnimationFrame;

  // Mock web3 call() function to return a Promise that returns the star name
  const call = () => new Promise((resolve) => resolve(star));

  // Mock the drizzle contracts so that the call is made
  const contracts = {
    contracts: {
      StarNotary: {
        methods: {
          lookUptokenIdToStarInfo: (tokenId: string) => call,
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
  });

  it('renders with a default form and message', () => {
    const wrapper = shallowMount(StarView, { localVue, store });
    expect(wrapper.find('#name').text().trim()).to.eq(name);
  });

  it('renders the star name when button clicked', async () => {
    const wrapper = shallowMount(StarView, { localVue, store });
    const button = wrapper.find('#btnGetStarInfo');
    await button.trigger('click');
    expect(wrapper.find('#name').text().trim()).to.eq(star);
  });

  it('updates the components tokenId data when the text field is updated', async () => {
    const wrapper = mount(StarView, { localVue });
    const textInput = wrapper.find('#fieldTokenId');
    textInput.setValue('123');
    expect(wrapper.vm.tokenId).to.eq('123');
  });
});
