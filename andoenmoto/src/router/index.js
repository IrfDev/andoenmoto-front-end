import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
},
{
    path: '/categories',
    name: 'categories-style',
    component: () =>
        import ( /* webpackChunkName: "about" */ '../views/Categories.vue'),
},
{
    path: '/categories/models',
    name: 'categories-style-models',
    component: () =>
        import ( /* webpackChunkName: "about" */ '../views/Models.vue'),
},
{
    path: '/categories/models/model',
    name: 'categories-style-models-model',
    component: () =>
        import ( /* webpackChunkName: "about" */ '../views/Model.vue'),
},
{
    path: '/profile/me',
    name: 'profile-page-edit',
    component: () =>
        import ( /* webpackChunkName: "about" */ '../views/PageProfile.vue'),
},
{
    path: '/profile/:name',
    name: 'profile-page-name',
    props: {itsMe: false},
    component: () =>
        import ( /* webpackChunkName: "about" */ '../views/PageProfile.vue'),
},
];

const router = new VueRouter({
    routes,
    mode: 'history',
});

export default router;
