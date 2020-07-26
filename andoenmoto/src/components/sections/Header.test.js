import vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Header from './Header';
import BasicButton from '../utilities/buttonn.vue'
import PostForm from '../ui/basics/PostForm.vue';

const localVue = createLocalVue();
localVue.use(vuex)

const store = new vuex.Store({
  modules: {
    auth: {
      state: {
        authId: 'asdasda9a0sd'
      }
    }
  }
})

describe('Header Section Component', () => {
  let cmp = shallowMount(Header, ({
    store,
    localVue,
    stubs: ['router-link', 'router-view']
  }));

  it('Modal for review opens after basic button click', async () => {
    const buttonWrapper = cmp.find('.modal-button-trrigger');
    await buttonWrapper.trigger('click');
    expect(cmp.findComponent(PostForm).exists).toBeTruthy();
  })
  
  it('Basic Button should mount', () => {
    expect(cmp.findComponent(BasicButton).exists).toBeTruthy();
  });

});