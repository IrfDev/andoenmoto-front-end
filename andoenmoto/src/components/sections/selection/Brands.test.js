import Vuex from 'vuex';
import { mount, createLocalVue } from '@vue/test-utils';
import Brands from './Brands.vue'

const localVue = createLocalVue();
localVue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    brands: {
      mutations: {
        SET_ACTIVE_BRAND() {
          jest.fn()
        }
      }
    }
  }
});

describe('Brands Sections/selection components', () => {
  let cmp = mount(Brands, {
    store, localVue, propsData: {
      brands: [
        'Shaft', 'Hebotecho', 'asdasd'
      ]
    }
  });

  it('Click on the brand triggers a method wich commit into the brand module', () => {
    const clickWrapper = cmp.find('.brand-wrapper');
    const spy = jest.spyOn(cmp.vm, 'brandSelected');
    clickWrapper.trigger('click');
    expect(cmp.vm.brandSelected).toBeCalled();
  });
});