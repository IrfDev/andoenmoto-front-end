import { shallowMount } from '@vue/test-utils';
import WingieRow from './WingieRow.vue';

describe('WingieRow/ utilities components', () => {
  let cmp = shallowMount(WingieRow, {
    slots: {
      default: '<div><p>Hello tester!</p></div>'
    }
  });

  it('Match the exact wingie 🦅 component', () => {
    expect(cmp.vm).toMatchSnapshot();
  })
})