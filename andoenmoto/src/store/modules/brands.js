import firebase from 'firebase';

export default {
  namespaced: true,

  state: {
    activeItem: {},
    items: {},
  },

  getters: {
    brandsFromActiveStyleId(state, getters, rootState) {
      const style = rootState.styles.activeItem.id;
      const brandsIds = Object.keys(state.items)
        .filter((key) => state.items[key].styles[style]);
      return Object.values(brandsIds)
        .map((brandId) => state.items[brandId]);
    },

    brandsFromActiveCategoryId: (state) => (id) => Object.keys(state.items)
      .filter((brand) => brand.categories[id]),

    activeBrand: (state) => (brandName) => Object.values(state.items)
      .find((brand) => brand.name === brandName),
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

    findAndActiveBrand({ commit, getters }, brandName) {
      const brand = getters.activeBrand(brandName);
      commit('SET_ACTIVE_BRAND', brand);
    },

    fetchAllBrands({ state, commit }) {
      return new Promise((resolve) => {
        firebase.database().ref('brands').once('value', (snapshot) => {
          const categoriesObject = snapshot.val();
          Object.keys(categoriesObject).forEach((categoryId) => {
            const categoryObj = categoriesObject[categoryId];
            const category = { ...categoryObj, id: categoryId };
            commit('SET_ITEM', { resource: 'brands', id: categoryId, item: category },
              { root: true });
          });
          resolve(Object.values(state.items));
        });
      });
    },
  },
};
