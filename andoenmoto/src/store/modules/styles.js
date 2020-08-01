import firebase from 'firebase';
import Vue from 'vue';

export default {
  namespaced: true,

  state: {
    activeItem: {},
    styles: {},
    items: {},
  },

  getters: {
    getStylesFromActiveBrand: (state, rootState) =>
      Object.keys(rootState.brands.activeItem.styles).map(
        (style) => state.items === style
      ),

    activeStyle: (state) => (styleName) =>
      Object.values(state.items).find((style) => style.title === styleName),

    stylesByArray: (state) => (idArray) =>
      state.items.filter((style) => {
        return idArray.includes(style);
      }),
  },

  mutations: {
    SET_STYLES(state, styles) {
      state.styles = styles;
    },

    PUSH_STYLE(state, brand) {
      Vue.set(state.styles, brand);
    },

    SET_ACTIVE_STYLE(state, style) {
      state.activeItem = style;
    },

    SET_ITEM(state, { id, item }) {
      state.items[id] = item;
    },

    CLEAR_ITEMS_STATE(state) {
      state.items = {};
      state.styles = {};
    },
  },

  actions: {
    async fetchStyles({ dispatch, commit }, ids) {
      commit('CLEAR_ITEMS_STATE');
      await dispatch('fetchItems', { resource: 'styles', ids }, { root: true });
    },

    findAndActiveStyle({ commit }, styleName) {
      return new Promise((resolve) => {
        firebase
          .database()
          .ref('styles')
          .orderByChild('title')
          .equalTo(styleName)
          .on('value', (snapshot) => {
            const styleKeyObject = snapshot.val();
            const styleId = Object.keys(styleKeyObject);
            const styleObject = styleKeyObject[styleId];
            commit('SET_ACTIVE_STYLE', {
              ...styleObject,
              id: styleId[0],
            });
            resolve(styleObject);
          });
      });
    },

    fetchAllStyles({ state, commit }) {
      return new Promise((resolve) => {
        firebase
          .database()
          .ref('styles')
          .once('value', (snapshot) => {
            const categoriesObject = snapshot.val();
            Object.keys(categoriesObject).forEach((categoryId) => {
              const categoryObj = categoriesObject[categoryId];
              const category = { ...categoryObj, id: categoryId };
              commit(
                'SET_ITEM',
                { resource: 'styles', id: categoryId, item: category },
                { root: true }
              );
            });
            resolve(Object.values(state.styles));
          });
      });
    },
  },
};
