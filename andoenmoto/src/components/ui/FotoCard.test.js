import { mount } from '@vue/test-utils';
import FotoCard from './FotoCard.vue';

describe('FotoCards.test.js', () => {
  let cmp;
  const createCmp = propsData => mount(FotoCard, { propsData });
  
  it('When the array of images have more than one image, should display carousel controls', () => {
    let urls = [
      'https://kodemia.mx',
      'https://kodemia.mx',
      'https://kodemia.mx',
    ]
    cmp = createCmp({ urls });
      expect(cmp.find('a').exists()).toBeTruthy();
  });
  
  it('When the array have one image, not render the carousel controls ', () => {
    let urls = [
      'https://kodemia.mx',
    ]
    cmp = createCmp({ urls });
      expect(cmp.find('a').exists()).toBeFalsy();
  });
})