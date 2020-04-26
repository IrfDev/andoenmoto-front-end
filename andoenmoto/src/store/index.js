import Vue from 'vue';
import Vuex from 'vuex';

import sourceData from '../lib/data.json';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sourceData,
    activeCategory: {},
    categories: {},
    posts: {},
    users: {},
    brands: {},
    styles: {},
    authId: 'u1asdasda4322r',
    profileUser: {},
  },

  getters: {
    authUser(state) {
      return state.sourceData.users.find((user) => user[state.authId])[state.authId];
    },
    profileUser: (state) => (id) => state.sourceData.users
      .find((user) => user[id])[id],

    activeCategory: (state) => (categoryName) => state.sourceData.categories
      .find((category) => category.name === categoryName),
  },

  actions: {
    activateCategory({ commit }, category) {
      commit('SET_ACTIVE_CATEGORY', category);
    },
    findUser({ commit, getters }, userId) {
      const activeUser = getters.profileUser(userId);
      commit('SET_PROFILE_USER', activeUser);
    },
    findCategory({ commit, getters }, categoryName) {
      const activeUser = getters.activeCategory(categoryName);
      commit('SET_ACTIVE_CATEGORY', activeUser);
    },
  },

  mutations: {
    SET_ACTIVE_CATEGORY(state, category) {
      state.activeCategory = category;
    },
    SET_PROFILE_USER(state, activeUser) {
      state.profileUser = activeUser;
    },
    SET_CATEGORIES(state, cateogories) {
      state.categories = cateogories;
    },
    SET_BRANDS(state, brands) {
      state.brands = brands;
    },
    SET_STYLES(state, styles) {
      state.styles = styles;
    },
    SET_BRAND(state, brand) {
      Vue.set(state.users, brand);
    },
  },
});
