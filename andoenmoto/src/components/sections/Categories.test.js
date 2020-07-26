import Vuex from 'vuex';
import { mount, createLocalVue } from '@vue/test-utils';
import Categories from './Categories.vue';
import CategoryBadge from '../ui/basics/CategoryBadge.vue';

const localVue = createLocalVue()
localVue.use(Vuex);

const items = [
  {
    name: 'Cascos',
    image: '/cascos.png',
    colWidth: 12
  },
  {
    name: 'Motocicletas',
    image: '/cascos.png',
    colWidth: 12
  },
  {
    name: 'Motocicletas',
    image: '/cascos.png',
    colWidth: 12
  },
]

const store = new Vuex.Store({
  modules: {
    categories: {
      state: {
        items
      }
    }
  }
});

describe('Categories Sections component', () => {
  let cmp = mount(Categories, {
    store,
    localVue
  });

  it('Categories render from Vuex store', () => {
    expect(cmp.findAllComponents(CategoryBadge).length).toBe(items.length)
  });


});