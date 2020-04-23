import Vue from 'vue';
import ToggleButton from 'vue-js-toggle-button';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(ToggleButton);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
