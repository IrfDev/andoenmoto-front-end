import firebase from 'firebase';

import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth';
import brands from './modules/brands';
import categories from './modules/categories';
import models from './modules/models';
import posts from './modules/posts';
import styles from './modules/styles';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},

  getters: {},

  actions: {
    fetchItem({ state, commit }, { id, resource }) {
      return new Promise((resolve) => {
        firebase
          .database()
          .ref(resource)
          .child(id)
          .once('value', (snapshot) => {
            const itemObj = snapshot.val();
            const item = { ...itemObj, id };
            commit(
              `${resource}/SET_ITEM`,
              { resource, id: snapshot.key, item },
              { root: true }
            );
            resolve(state[resource].items[id]);
          });
      });
    },

    fetchItems({ dispatch }, { ids, resource }) {
      return Promise.all(
        ids.map((id) => dispatch('fetchItem', { id, resource }))
      );
    },
  },

  mutations: {
    SET_ITEM(state, { item, resource, id }) {
      Vue.set(state[resource].items, id, item);
    },
  },

  modules: {
    auth,
    brands,
    categories,
    models,
    posts,
    styles,
  },
});
