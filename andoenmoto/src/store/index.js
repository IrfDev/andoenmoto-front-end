import Vue from 'vue';
import Vuex from 'vuex';

import sourceData from '../lib/data.json';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sourceData,
    activeCategory: {},
    authId: 'u1asdasda4322r',
    profileUser: {},
  },

  getters: {
    authUser(state) {
      return state.sourceData.users.find((user) => user[state.authId])[state.authId];
    },
    profileUser(state, idd) {
      return state.sourceData.users.find((user) => user[idd])[idd];
    },
  },

  actions: {
    activateCategoryy({ commit }, category) {
      commit('SET_ACTIVE_CATEGORY', category);
    },
    findUser({ commit, getters }, userId) {
      const activeUser = getters('profileUser', userId);
      commit('SET_PROFILE_USER', activeUser);
    },
  },

  mutations: {
    SET_ACTIVE_CATEGORY(state, category) {
      state.activeCategory = category;
    },
    SET_PROFILE_USER(state, activeUser) {
      state.profileUser = activeUser;
    },
  },
});
