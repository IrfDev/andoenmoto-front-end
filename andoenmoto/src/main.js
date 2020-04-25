import Vue from 'vue';
import Buttonn from '@/components/utilities/button.vue';
import Avatar from '@/components/utilities/Avatar.vue';
import ToggleButton from 'vue-js-toggle-button';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(ToggleButton);

Vue.component('BasicButton', Buttonn);
Vue.component('Avatar', Avatar);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
