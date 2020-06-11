import Vuex from 'vuex';
import { mount, createLocalVue } from '@vue/test-utils';
import Styles from './styles.vue'

const localVue = createLocalVue();
localVue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    styles: {
      mutations: {
        SET_ACTIVE_STYLE() {
          jest.fn()
        }
      }
    }
  }
});

describe('Styles Sections/selection components', () => {
  let cmp = mount(Styles, {
    store, localVue, propsData: {
      styles: {
        '2': {
          name:'ASASD',
        },
        '3': {
          name: 'Hola',
        },
      },
    }
  });

  it('Click on the brand triggers a method wich commit into the brand module', () => {
    const clickWrapper = cmp.find('.col-md-5');
    const spy = jest.spyOn(cmp.vm, 'styleSelected');
    clickWrapper.trigger('click');
    expect(cmp.vm.styleSelected).toBeCalled();
  });
});