import { mount } from '@vue/test-utils';
import HorizontalPosts from './HorizontalPosts.vue'
import postCard from '../ui/postCard.vue'

describe('Horizontal posts Sections Components', () => {
  const posts = ['/hola.png', '/hola.png', '/hola.png']
  let cmp = mount(HorizontalPosts, { propsData: { posts } });

  it('Fotos inside properties are the same length as FotoCard Components', () => {
    expect(cmp.findAllComponents(postCard).length).toBe(posts.length)
  })
})