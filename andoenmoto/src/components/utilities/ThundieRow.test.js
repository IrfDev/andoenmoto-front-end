import { shallowMount } from '@vue/test-utils';
import ThundieRow from './ThundieRow.vue';

describe('ThundieRow/ utilities components', () => {
  let cmp = shallowMount(ThundieRow, {
    slots: {
      default: '<div><p>Hello tester!</p></div>'
    }
  });

  it('Match the exact Thundie ⚡️ component', () => {
    expect(cmp.vm).toMatchSnapshot();
  })
})