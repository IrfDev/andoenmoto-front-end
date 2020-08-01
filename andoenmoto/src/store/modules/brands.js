import firebase from 'firebase';

export default {
  namespaced: true,

  state: {
    activeItem: {},

    items: {},

    filterItems: {},
  },

  getters: {
    brandsFromActiveStyleId(state, getters, rootState) {
      const style = rootState.styles.activeItem.id;
      const brandsIds = Object.keys(state.items).filter(
        (key) => state.items[key].styles[style]
      );
      return Object.values(brandsIds).map((brandId) => state.items[brandId]);
    },

    // styleBrands: (state, _, rootState) => {
    //   // const hello = items;
    //   const arrayState = Object.values(state);
    //   // console.log(state.items.length);
    //   if (state.items === {}) {
    //     return Object.values(arrayState[1]).filter((item) =>
    //       Object.keys(item.style).includes(rootState.styles.activeItem.id),
    //     );
    //   } else {
    //     return state;
    //   }
    // },

    brandsFromActiveCategoryId: (state) => (id) =>
      Object.keys(state.items).filter((brand) => brand.categories[id]),

    activeBrand: (state) => (brandName) =>
      Object.values(state.items).find((brand) => brand.name === brandName),
  },

  mutations: {
    SET_ACTIVE_BRAND(state, brand) {
      state.activeItem = brand;
    },

    SET_BRANDS(state, brands) {
      state.items = brands;
    },

    CLEAR_ITEMS_STATE(state) {
      state.items = {};
      state.filterBrands = {};
    },

    SET_ITEM(state, { id, item }) {
      state.items[id] = item;
      // oldStateItems[`${id}`] = item;
    },

    SET_STYLE_BRANDS(state, items) {
      state.filterItems = items;
    },
  },

  actions: {
    async fetchBrands({ dispatch, state, commit }, ids) {
      commit('CLEAR_ITEMS_STATE');
      await dispatch('fetchItems', { resource: 'brands', ids }, { root: true });
    },

    /* This action is for the Select component, and it's dispatch when Style and Category are selected
     and we just have to select this items 
     */
    fetchCategoryStyleBrands({ rootState, dispatch, commit }) {
      return new Promise(async (resolve) => {
        commit('CLEAR_ITEMS_STATE');
        const categoryBrands = rootState.categories.activeItem.brands;

        const allBrands = Object.keys(categoryBrands);

        const s = await dispatch(
          'fetchItems',
          { resource: 'brands', ids: allBrands },
          { root: true }
        );

        const filterArray = Object.values(s).filter((item) =>
          Object.keys(item.styles).includes(rootState.styles.activeItem.id)
        );

        commit('SET_STYLE_BRANDS', filterArray);
        resolve(s);
      });
    },

    findAndActiveBrand({ commit }, brandName) {
      return new Promise((resolve) => {
        firebase
          .database()
          .ref('brands')
          .orderByChild('name')
          .equalTo(brandName)
          .on('value', (snapshot) => {
            const brandKeyObject = snapshot.val();
            const brandId = Object.keys(brandKeyObject);
            const brandObject = brandKeyObject[brandId];
            commit('SET_ACTIVE_BRAND', {
              ...brandObject,
              id: brandId[0],
            });
            resolve(brandObject);
          });
      });
    },

    findAndActiveCategoryBrand({ commit }, brandName) {
      return new Promise((resolve) => {
        firebase
          .database()
          .ref('brands')
          .orderByChild('name')
          .equalTo(brandName)
          .on('value', (snapshot) => {
            const brandKeyObject = snapshot.val();
            const brandId = Object.keys(brandKeyObject);
            const brandObject = brandKeyObject[brandId];
            commit('SET_ACTIVE_BRAND', {
              ...brandObject,
              id: brandId[0],
            });
            resolve(brandObject);
          });
      });
    },

    fetchAllBrands({ state, commit }) {
      return new Promise((resolve) => {
        firebase
          .database()
          .ref('brands')
          .once('value', (snapshot) => {
            const categoriesObject = snapshot.val();
            Object.keys(categoriesObject).forEach((categoryId) => {
              const categoryObj = categoriesObject[categoryId];
              const category = { ...categoryObj, id: categoryId };
              commit('SET_ITEM', {
                resource: 'brands',
                id: categoryId,
                item: category,
              });
            });
            resolve(Object.values(state.items));
          });
      });
    },
  },
};
