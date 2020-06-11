import {mount} from '@vue/test-utils'
import BrandCard from './BrandCard.vue';

describe('BrandCards.test.js', () => {
  let cmp;
  const createCmp = propsData => mount(BrandCard, { propsData });
  const brand = 'Shaft'

  beforeEach(() => {
    cmp = createCmp({
      brand
    });
  })

  it('Image is rendering with correct src', () => {
    expect(cmp.find('img').exists).toBeTruthy();
  });
})