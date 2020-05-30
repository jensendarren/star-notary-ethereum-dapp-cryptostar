import { expect } from 'chai';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import Account from '@/components/Account.vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(Vuetify);

describe('Account.vue', () => {
  let store: any;
  const account = '0xC01011611e3501C6b3F6dC4B6d3FE644d21aB301';
  const balance = '99948855600000000000';
  let wrapper: any;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        accounts: {
          namespaced: true,
          getters: {
            activeAccount: () => account,
            activeBalance: () => balance,
          },
        },
      },
    });
    wrapper = shallowMount(Account, { store, localVue });
  });

  it('renders default account number and account balance from the namespaced getters', () => {
    expect(wrapper.find('#account').text().trim()).to.eq(account);
    expect(wrapper.find('#balance').text().trim()).to.eq(balance);
  });
});
