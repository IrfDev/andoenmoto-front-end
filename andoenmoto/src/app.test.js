import { shallow } from 'vue-test-utils'
import App from './App.vue'
describe('App.test.js', () => {
  let cmp

  beforeEach(() => {
    cmp = shallow(App)
  })

  it('Has been render', () => {
    expect(cmp.vm)
  })
})