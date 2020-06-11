import { shallowMount } from '@vue/test-utils';
import PostCard from './PostCard.vue'

describe('PostCard component', () => {
  let cmp
  const createCmp = (propsData) => shallowMount(PostCard, { propsData });

  it('Random background color', () => {
    let postObject = {
      post: {
        content: 'Hello Im a component',
        title: 'Yeah dude!',
        user: 'Irving.com',
      }
    };
    cmp = createCmp(postObject);
    expect(cmp.vm.bgColor).toContain('linear-gradient');
  });
});