import firebase from 'firebase';

export default {
  namespaced: true,

  state: {
    items: {},
    activeItem: {},
  },

  getters: {
    activeCategory: (state) => (categoryName) =>
      Object.values(state.items).find((category) => {
        return category.name === categoryName;
      }),
  },

  mutations: {
    SET_ACTIVE_CATEGORY(state, category) {
      state.activeItem = category;
    },

    SET_ITEM(state, { id, item }) {
      state.items[id] = item;
    },

    SET_CATEGORIES(state, cateogories) {
      state.items = Object.values(cateogories);
    },
  },

  actions: {
    activateCategory({ commit }, category) {
      commit('SET_ACTIVE_CATEGORY', category);
    },

    fetchCategories({ dispatch }, ids) {
      return dispatch('fetchItems', { resource: 'categories', ids });
    },

    findCategory({ commit }, categoryName) {
      return new Promise((resolve) => {
        firebase
          .database()
          .ref('categories')
          .orderByChild('name')
          .equalTo(categoryName)
          .on('value', (snapshot) => {
            const categoryKeyObject = snapshot.val();
            const categoryId = Object.keys(categoryKeyObject);
            const categoryObject = categoryKeyObject[categoryId];
            commit('SET_ACTIVE_CATEGORY', {
              ...categoryObject,
              id: categoryId[0],
            });
            resolve(categoryObject);
          });
      });
    },

    fetchAllCategories({ state, commit }) {
      return new Promise((resolve) => {
        firebase
          .database()
          .ref('categories')
          .once('value', (snapshot) => {
            const categoriesObject = snapshot.val();
            Object.keys(categoriesObject).forEach((categoryId) => {
              const categoryObj = categoriesObject[categoryId];
              const category = { ...categoryObj, id: categoryId };
              commit(
                'SET_ITEM',
                { resource: 'categories', id: categoryId, item: category },
                { root: true }
              );
            });
            resolve(Object.values(state.items));
          });
      });
    },
  },
};
