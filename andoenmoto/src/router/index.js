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
    path: '/:category',
    name: 'categories-style',
    component: () =>
        import ( /* webpackChunkName: "abouts" */ '../views/Categories.vue'),
},
{
    path: '/:category/:brand',
    name: 'category-styles',
    component: () =>
        import ( /* webpackChunkName: "styles" */ '../views/reviews/Select.vue'),
},
{
    path: '/:category/:style',
    name: 'category-brands',
    component: () =>
        import ( /* webpackChunkName: "aboassaut" */ '../views/reviews/Select.vue'),
},
{
    path: '/:category/:style/:brand/modelos',
    name: 'categories-style-models',
    component: () =>
        import ( /* webpackChunkName: "categories" */ '../views/Models.vue'),
},
{
    path: '/categories/models/model',
    name: 'categories-style-models-model',
    component: () =>
        import ( /* webpackChunkName: "modeasdls" */ '../views/Model.vue'),
},
{
    path: '/profile/me',
    name: 'profile-page-edit',
    component: () =>
        import ( /* webpackChunkName: "edight" */ '../views/PageProfile.vue'),
},
{
    path: '/profile/:profileId',
    name: 'profile-page-name',
    props: {itsMe: false},
    component: () =>
        import ( /* webpackChunkName: "names" */ '../views/PageProfile.vue'),
},
];

const router = new VueRouter({
    mode: 'history',
    routes,
});

export default router;
