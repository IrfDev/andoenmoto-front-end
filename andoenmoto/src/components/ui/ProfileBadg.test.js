import { mount } from '@vue/test-utils';
import ProfileBadge from './ProfileBadge.vue';

describe('Profile Badge UI Component', () => {
  let cmp
  const createCmp = (propsData) => mount(ProfileBadge, { propsData })

  it('Component render with his propertly props', () => {
    let props = {
      titleBadge: 'Beginner'
    };
    cmp = createCmp(props);
    expect(cmp.exists()).toBeTruthy();
  });
});