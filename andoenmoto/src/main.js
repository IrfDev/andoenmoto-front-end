import Vue from 'vue';
import Buttonn from '@/components/utilities/buttonn.vue';
import Avatar from '@/components/utilities/Avatar.vue';
import WingieRow from '@/components/utilities/WingieRow.vue';
import ThundieRow from '@/components/utilities/ThundieRow.vue';
import LightieRow from '@/components/utilities/LightieRow.vue';
import ToggleButton from 'vue-js-toggle-button';

import firebase from 'firebase';
import vuelidate from 'vuelidate';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(ToggleButton);

const firebaseConfig = {
  apiKey: 'AIzaSyDIoNZxJK7Ur_fLvILmcJEzvEUSWUJIuP0',
  authDomain: 'andoenmoto-mexico.firebaseapp.com',
  databaseURL: 'https://andoenmoto-mexico.firebaseio.com',
  projectId: 'andoenmoto-mexico',
  storageBucket: 'andoenmoto-mexico.appspot.com',
  messagingSenderId: '713017173595',
  appId: '1:713017173595:web:d01761cc39263bf984417e',
  measurementId: 'G-W4E23LENB0',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

Vue.component('BasicButton', Buttonn);
Vue.component('Avatar', Avatar);
Vue.component('WingsRow', WingieRow);
Vue.component('LightieRow', LightieRow);
Vue.component('ThundieRow', ThundieRow);

router.beforeEach((to, from, next) => {
  store.dispatch('auth/initAuthentication');
  if (to.matched.some((route) => route.meta.requiresAuth)) {
    if (store.state.auth.authId) {
      next();
    } else {
      next({ name: 'Home' });
    }
  } else {
    next();
  }
});


firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch('auth/fetchAuthUserId');
  }
});

Vue.use(vuelidate);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
