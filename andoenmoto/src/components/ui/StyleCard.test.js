import { mount } from '@vue/test-utils';
import StyleCard from './StyleCard.vue';

describe('StyleCard UI Components', () => {
  let cmp 
  const createCmp = (propsData) => mount(StyleCard, { propsData });

  it('Style card mount with his respective props', () => {
    const props = {
      title: 'Hello tester!',
      description: 'Making some noise!!!!'
    };
    cmp = createCmp(props);
    expect(cmp.props()).toStrictEqual(props);
  })
})