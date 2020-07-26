import {mount, createLocalVue} from '@vue/test-utils'
import Avatar from './Avatar';


import Vuex from 'vuex';

const localVue = createLocalVue();
localVue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth: {
      state: {
        profileUser: {
          profile:'asdasd'
        }
      },
      getters: {
        findUser: () => 'asdasd'
      }
    },
  }
})

describe('Avatar.test.js', () => {
  let cmp;
  const createCmp = propsData => mount(Avatar, { propsData, store,localVue });

  it('Avatar/Utilities component', () => {
    cmp = createCmp({
      auth: true
    });
    expect(cmp.element).toMatchSnapshot();
  })
})