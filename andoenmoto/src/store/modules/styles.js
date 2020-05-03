import firebase from 'firebase';
import Vue from 'vue';

export default {
  state: {
    activeStyle: {},
    styles: {},
  },
  getters: {
  },
  mutations: {
    SET_STYLES(state, styles) {
      state.styles = styles;
    },
    PUSH_STYLE(state, brand) {
      Vue.set(state.stylesB, brand);
    },
    SET_ACTIVE_STYLE(state, style) {
      state.activeStyle = style;
    },
  },
  actions: {
    fetchStyles({ dispatch, state }, ids) {
      state.styles = {};
      dispatch('fetchItems', { resource: 'styles', ids });
    },

    fetchAllStyles({ state, commit }) {
      return new Promise((resolve) => {
        firebase.database().ref('styles').once('value', (snapshot) => {
          const categoriesObject = snapshot.val();
          Object.keys(categoriesObject).forEach((categoryId) => {
            const categoryObj = categoriesObject[categoryId];
            const category = { ...categoryObj, id: categoryId };
            commit('SET_ITEM', { resource: 'styles', id: categoryId, item: category },
              { root: true });
          });
          resolve(Object.values(state.styles));
        });
      });
    },
  },
};
