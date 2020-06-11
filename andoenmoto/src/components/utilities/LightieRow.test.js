import { shallowMount } from '@vue/test-utils';
import LightieRow from './LightieRow';

describe('Lightierow/ utilities components', () => {
  let cmp = shallowMount(LightieRow, {
    slots: {
    default:'<div><p>Hello tester!</p></div>'
  }});

  it('Match the exact lightie components', () => {
    expect(cmp.vm).toMatchSnapshot();
  })
})