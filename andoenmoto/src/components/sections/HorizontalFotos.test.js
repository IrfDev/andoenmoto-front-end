import { mount } from '@vue/test-utils';
import HorizontalFotos from './HorizontalFotos.vue'
import FotoCard from '../ui/FotoCard.vue'

describe('Horizontal Fotos Sections Components', () => {
  const fotos = ['/hola.png', '/hola.png', '/hola.png' ]
  let cmp = mount(HorizontalFotos, { propsData:{fotos} });

  it('Fotos inside properties are the same length as FotoCard Components', () => {
    expect(cmp.findAllComponents(FotoCard).length).toBe(fotos.length)
  })
})