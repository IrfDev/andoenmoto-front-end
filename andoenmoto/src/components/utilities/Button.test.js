import {mount} from '@vue/test-utils'
import Button from './buttonn.vue';

describe('Avatar.test.js', () => {
  let cmp;
  const createCmp = propsData => mount(Button, { propsData });
  const content = 'Iniciar sesión'

  beforeEach(() => {
    cmp = createCmp({
      secondary: true,
      content
    });
  })
  
  it('Class Binding for secondary and main', () => {
    expect(cmp.find('button').classes()).toContain('secondary');
  });

  it('Content binding is the same as content props', () => {
    expect(cmp.find('button').text()).toBe(content);
  });
})