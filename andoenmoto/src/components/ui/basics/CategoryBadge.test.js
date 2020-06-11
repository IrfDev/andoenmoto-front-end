import { mount } from '@vue/test-utils';
import CategoryBadge from './CategoryBadge.vue';

const createCmp = (name, image) => mount(CategoryBadge, {
  propsData: {
    name,
    image,
  }
});

describe('Category Badge Snapshot', () => {
  it('Props are corrects', () => {
    const cmp = createCmp('Motos', '/motos.png');
    expect(cmp.element).toMatchSnapshot();
  });
});