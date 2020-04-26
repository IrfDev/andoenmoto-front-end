import Vue from 'vue';
import firebase from 'firebase';
import Buttonn from '@/components/utilities/button.vue';
import Avatar from '@/components/utilities/Avatar.vue';
import ToggleButton from 'vue-js-toggle-button';
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
  measurementId: 'G-W4E23LENB0'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

Vue.component('BasicButton', Buttonn);
Vue.component('Avatar', Avatar);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
