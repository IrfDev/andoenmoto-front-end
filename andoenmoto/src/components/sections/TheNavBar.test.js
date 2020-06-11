import { mount, createLocalVue } from '@vue/test-utils';
import TheNavBar from './TheNavBar.vue';
import Vuex from 'vuex';

const localVue = createLocalVue();
localVue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth: {
      state: {
        authId: 'asdasdasda',
      }
    }
  }
})

describe('Logo test snapshot', () => {
  it('Logo are the same', () => {
    const cmp = mount(TheNavBar,{store, localVue});
    expect(cmp.element).toMatchSnapshot();
  });
});