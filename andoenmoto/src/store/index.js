import Vue from 'vue';
import Vuex from 'vuex';

import firebase from 'firebase';

import sourceData from '../lib/data.json';

Vue.use(Vuex);

export default new Vuex.Store(
  {
    state: {
      sourceData,
      activeCategory: {},
      activeStyle: {},
      activeBrand: {},
      categories: {},
      posts: [],
      users: [],
      models: {},
      brands: {},
      styles: {},
      authId: '0',
      profileUser: {},
    },

    getters: {
      authUser: (state) => state.users[state.authId],

      profileUser: (state) => (id) => state.sourceData.users
        .find((user) => user[id])[id],

      activeCategory: (state) => (categoryName) => Object.values(state.categories)
        .find((category) => category.name === categoryName),

      brandsFromActiveStyleId: (state) => Object.values(state.brands)
        .filter((brand) => brand.styles[state.activeStyle.id]),

      modelsFromBrandAndCategory: (state) => Object.values(state.models)
        .filter((model) => model.brand === state.activeBrand.id
          && model.category === state.activeCategory.id
          && model.style === state.activeStyle.id),
    },

    actions: {
      activateCategory({ commit }, category) {
        commit('SET_ACTIVE_CATEGORY', category);
      },

      fetchCategories({ dispatch }, ids) {
        return dispatch('fetchItems', { resource: 'categories', ids });
      },

      fetchStyles({ dispatch, state }, ids) {
        state.styles = {};
        dispatch('fetchItems', { resource: 'styles', ids });
      },

      fetchBrands({ dispatch, state }, ids) {
        state.brands = {};
        dispatch('fetchItems', { resource: 'brands', ids });
      },

      findUser({ commit, getters }, userId) {
        const activeUser = getters.profileUser(userId);
        commit('SET_PROFILE_USER', activeUser);
      },

      findCategory({ commit, getters }, categoryName) {
        const category = getters.activeCategory(categoryName);
        commit('SET_ACTIVE_CATEGORY', category);
      },

      fetchAllCategories({ state, commit }) {
        return new Promise((resolve) => {
          firebase.database().ref('categories').once('value', (snapshot) => {
            const categoriesObject = snapshot.val();
            Object.keys(categoriesObject).forEach((categoryId) => {
              const categoryObj = categoriesObject[categoryId];
              const category = { ...categoryObj, id: categoryId };
              commit('SET_ITEM', { resource: 'categories', id: categoryId, item: category });
            });
            resolve(Object.values(state.categories));
          });
        });
      },

      fetchAllStyles({ state, commit }) {
        return new Promise((resolve) => {
          firebase.database().ref('styles').once('value', (snapshot) => {
            const categoriesObject = snapshot.val();
            Object.keys(categoriesObject).forEach((categoryId) => {
              const categoryObj = categoriesObject[categoryId];
              const category = { ...categoryObj, id: categoryId };
              commit('SET_ITEM', { resource: 'styles', id: categoryId, item: category });
            });
            resolve(Object.values(state.styles));
          });
        });
      },

      fetchAllBrands({ state, commit }) {
        return new Promise((resolve) => {
          firebase.database().ref('brands').once('value', (snapshot) => {
            const categoriesObject = snapshot.val();
            Object.keys(categoriesObject).forEach((categoryId) => {
              const categoryObj = categoriesObject[categoryId];
              const category = { ...categoryObj, id: categoryId };
              commit('SET_ITEM', { resource: 'brands', id: categoryId, item: category });
            });
            resolve(Object.values(state.brands));
          });
        });
      },

      fetchAllModels({ state, commit }) {
        return new Promise((resolve) => {
          firebase.database().ref('models').once('value', (snapshot) => {
            const categoriesObject = snapshot.val();
            Object.keys(categoriesObject).forEach((categoryId) => {
              const categoryObj = categoriesObject[categoryId];
              const category = { ...categoryObj, id: categoryId };
              commit('SET_ITEM', { resource: 'models', id: categoryId, item: category });
            });
            resolve(Object.values(state.brands));
          });
        });
      },

      fetchItem({ state, commit }, { id, resource }) {
        return new Promise((resolve) => {
          firebase.database().ref(resource).child(id).once('value', (snapshot) => {
            const itemObj = snapshot.val();
            const item = { ...itemObj, id };
            commit('SET_ITEM', { resource, id: snapshot.key, item });
            resolve(state[resource][id]);
          });
        });
      },

      fetchItems({ dispatch }, { ids, resource }) {
        // ids = Array.isArray(ids) ? ids : Object.keys(ids);
        return Promise.all(ids.map((id) => dispatch('fetchItem', { id, resource })));
      },
    },

    mutations: {
      SET_ACTIVE_CATEGORY(state, category) {
        state.activeCategory = category;
      },
      SET_ACTIVE_STYLE(state, style) {
        state.activeStyle = style;
      },
      SET_ACTIVE_BRAND(state, brand) {
        state.activeBrand = brand;
      },
      SET_PROFILE_USER(state, activeUser) {
        state.profileUser = activeUser;
      },
      SET_CATEGORIES(state, cateogories) {
        state.categories = Object.values(cateogories);
      },
      SET_ITEM(state, { item, resource, id }) {
        Vue.set(state[resource], id, item);
      },
      SET_USERS(state, users) {
        state.users = users;
      },
      SET_BRANDS(state, brands) {
        state.brands = brands;
      },
      SET_MODELS(state, models) {
        state.models = models;
      },
      SET_STYLES(state, styles) {
        state.styles = styles;
      },
      SET_BRAND(state, brand) {
        Vue.set(state.users, brand);
      },
      PUSH_STYLE(state, brand) {
        Vue.set(state.stylesB, brand);
      },
    },
  },
);
