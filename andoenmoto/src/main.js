import dotenv from 'dotenv';
import Vue from 'vue';
import ToggleButton from 'vue-js-toggle-button';

import Buttonn from '@/components/utilities/buttonn.vue';
import Avatar from '@/components/utilities/Avatar.vue';
import WingieRow from '@/components/utilities/WingieRow.vue';
import ThundieRow from '@/components/utilities/ThundieRow.vue';
import LightieRow from '@/components/utilities/LightieRow.vue';

import firebase from 'firebase';
import vuelidate from 'vuelidate';

import App from './App.vue';
import router from './router';
import store from './store';

dotenv.config();

Vue.use(ToggleButton);

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID,
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
  console.log('Router');
  // store.dispatch('auth/initAuthentication');
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

Vue.prototype.$analytics = firebase.analytics();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
