import { mount } from '@vue/test-utils';
import Logo from './Logo.vue';

describe('Logo test snapshot', () => {
  it('Logo are the same', () => {
    const cmp = mount(Logo);
    expect(cmp.element).toMatchSnapshot();
  });
});