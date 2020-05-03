import firebase from 'firebase';

export default {
  namespaced: true,

  state: {
    items: {},
  },

  getters: {
    postsFromModel(state, getters, rootState) {
      return Object.values(state.items)
        .filter((post) => post.model === rootState.models.activeItem.id);
    },

    fotosFromPosts: (state, getters) => Object.values(getters.postsFromModel)
      .map((post) => Object.values(post.media.images)
        .map((foto) => foto.url)),
  },

  mutations: {
  },

  actions: {
    fetchAllPosts({ state, commit }) {
      return new Promise((resolve) => {
        firebase.database().ref('posts').on('value', (snapshot) => {
          const categoriesObject = snapshot.val();
          Object.keys(categoriesObject).forEach((categoryId) => {
            const categoryObj = categoriesObject[categoryId];
            const category = { ...categoryObj, id: categoryId };
            commit('SET_ITEM', { resource: 'posts', id: categoryId, item: category },
              { root: true });
          });
          resolve(Object.values(state.items));
        });
      });
    },

    submitPost({ state, commit, rootState }, newPost) {
      const user = rootState.auth.authId;
      const postId = firebase.database().ref('posts').push().key;
      const publishedAt = Math.floor(Date.now() / 1000);

      const post = {
        ...newPost,
        user,
        postId,
        publishedAt,
      };

      const updates = {};
      updates[`posts/${postId}`] = post;
      updates[`users/${post.user}/posts/${postId}`] = postId;
      firebase.database().ref().update(updates)
        .then(() => {
          commit('SET_ITEM', { resource: 'posts', item: post, id: postId }, { root: true });
          return Promise.resolve(state.items[postId]);
        });
    },
  },
};
