import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import Account from '@/components/Account.vue';

describe('Account.vue', () => {
  it('renders default account number', () => {
    const wrapper = shallowMount(Account, {});
    console.log(wrapper);
    // expect(wrapper.text()).to.include();
  });
});
