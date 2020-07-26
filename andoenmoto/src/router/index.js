import Vue from 'vue';
import store from '@/store';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/categoria/:category',
      name: 'categories-style',
      component: () => import('../views/Categories.vue'),
    },
    {
      path: '/categoria/:category/marca/:brand',
      name: 'category-styles',
      component: () => import('../views/reviews/Select.vue'),
    },
    {
      path: '/categoria/:category/estilo/:style',
      name: 'category-brands',
      component: () => import('../views/reviews/Select.vue'),
    },
    {
      path: '/categoria/:category/estilo/:style/marca/:brand/modelos',
      name: 'categories-style-models',
      component: () => import('../views/Models.vue'),
    },
    {
      path: '/categoria/:category/estilo/:style/marca/:brand/modelo/:model',
      name: 'categories-style-models-model',
      component: () => import('../views/Model.vue'),
    },
    {
      path: '/profile/me',
      name: 'profile-page-edit',
      meta: { requiresAuth: true },
      props: {
        itsMe: true,
      },
      component: () => import('../views/PageProfile.vue'),
    },
    {
      path: '/register',
      name: 'registro',
      component: () => import('../views/Register.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
    },
    {
      path: '/profile/:profileId',
      name: 'profile-page-nam',
      props: { itsMe: false },
      component: () => import('../views/PageProfile.vue'),
    },
    {
      path: '/sign-out',
      name: 'sign-out',
      beforeEnter(to, from, next) {
        store.dispatch('auth/signOut').then(() => next({ path: '/' }));
      },
    },
  ],
});
