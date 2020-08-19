import firebase from 'firebase';

export default {
  namespaced: true,

  state: {
    items: {},
    activeItems: {},
    activeItem: {},
    newModel: '',
  },
  getters: {
    modelsFromBrandAndCategory(state, getters, rootState) {
      return Object.values(state.items).filter(
        (model) =>
          model.brand === rootState.brands.activeItem.id &&
          model.category === rootState.categories.activeItem.id &&
          model.style === rootState.styles.activeItem.id
      );
    },

    activeModel: (state) => (modelName) =>
      Object.values(state.items).find((model) => model.name === modelName),
  },
  mutations: {
    SET_ACTIVE_MODEL(state, model) {
      state.activeItem = model;
    },

    SET_MODELS(state, models) {
      state.items = models;
    },

    SET_ITEM(state, { id, model }) {
      state[id] = { ...model, id };
    },

    SET_NEW_MODEL(state, id) {
      state.newModel = id;
    },
  },
  actions: {
    createNewModel({ commit }, newModel) {
      return new Promise((resolve) => {
        const modelsRef = firebase.database().ref('models');

        const newModelID = modelsRef.push(newModel).key;

        firebase
          .database()
          .ref('models')
          .child(newModelID)
          .update(newModel)
          .then(() => {
            commit('SET_NEW_MODEL', newModelID);

            commit('SET_ITEM', { id: newModel['.key'], model: newModel });
            resolve(newModel);
          });
      });
    },

    findAndActiveModel({ commit, getters }, modelName) {
      return new Promise((resolve) => {
        firebase
          .database()
          .ref('models')
          .orderByChild('name')
          .equalTo(modelName)
          .on('value', (snapshot) => {
            const modelKeyObject = snapshot.val();

            const modelId = Object.keys(modelKeyObject);

            const modelObject = modelKeyObject[modelId[0]];

            commit('SET_ACTIVE_MODEL', {
              ...modelObject,
              id: modelId[0],
            });
            resolve(modelObject);
          });
      });
    },

    fetchAllModels({ state, commit }) {
      return new Promise((resolve) => {
        firebase
          .database()
          .ref('models')
          .once('value', (snapshot) => {
            const categoriesObject = snapshot.val();
            Object.keys(categoriesObject).forEach((categoryId) => {
              const categoryObj = categoriesObject[categoryId];
              const category = { ...categoryObj, id: categoryId };
              commit(
                'SET_ITEM',
                { resource: 'models', id: categoryId, item: category },
                { root: true }
              );
            });
            resolve(Object.values(state.items));
          });
      });
    },
  },
};
