import firebase from 'firebase';

export default {
  namespaced: true,

  state: {
    activeItem: {},
    items: {},
  },

  getters: {
    brandsFromActiveStyleId: (state) => Object.values(state.brands)
      .filter((brand) => brand.styles[state.activeStyle.id]),
  },

  mutations: {
    SET_ACTIVE_BRAND(state, brand) {
      state.activeItem = brand;
    },

    SET_BRANDS(state, brands) {
      state.items = brands;
    },
  },

  actions: {
    fetchBrands({ dispatch, state }, ids) {
      state.items = {};
      dispatch('fetchItems', { resource: 'brands', ids }, { root: true });
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
          resolve(Object.values(state.items));
        });
      });
    },
  },
};
