import { shallowMount } from '@vue/test-utils';
import FixedCtas from './FixedCtas';

describe('Fixed Ctas/ utilities components', () => {
  let cmp = shallowMount(FixedCtas);

  it('Match the exact ctas components', () => {
    expect(cmp.vm).toMatchSnapshot();
  })
})