import firebase from 'firebase';

export default {
  namespaced: true,

  state: {
    items: {},
    activeItems: {},
  },
  getters: {
    modelsFromBrandAndCategory(state, getters, rootState) {
      return Object.values(state.items)
        .filter((model) => model.brand === rootState.brands.activeItem.id
          && model.category === rootState.categories.activeItem.id
          && model.style === rootState.styles.activeItem.id);
    },
  },
  mutations: {
    SET_ACTIVE_MODEL(state, model) {
      state.activeItem = model;
    },
    SET_MODELS(state, models) {
      state.items = models;
    },
  },
  actions: {
    fetchAllModels({ state, commit }) {
      return new Promise((resolve) => {
        firebase.database().ref('models').once('value', (snapshot) => {
          const categoriesObject = snapshot.val();
          Object.keys(categoriesObject).forEach((categoryId) => {
            const categoryObj = categoriesObject[categoryId];
            const category = { ...categoryObj, id: categoryId };
            commit('SET_ITEM', { resource: 'models', id: categoryId, item: category },
              { root: true });
          });
          resolve(Object.values(state.items));
        });
      });
    },
  },
};
