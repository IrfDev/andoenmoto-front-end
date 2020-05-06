import firebase from 'firebase';

export default {
  namespaced: true,

  state: {
    items: {},
    features: {},
    newReview: '',
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
    SET_ALL_FEATURES(state, features) {
      state.features = features;
    },

    SET_NEW_REVIEW(state, id) {
      state.newReview = id;
    },
  },

  actions: {
    fetchAllFeatures({ commit, state }) {
      return new Promise((res) => {
        firebase.database().ref('features').on('value', (snapshot) => {
          const featArray = Object.keys(snapshot.val());
          commit('SET_ALL_FEATURES', featArray);
        });
        return res(state.features);
      });
    },

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

    submitReview({ state, commit, rootState }, newReview) {
      console.log(newReview);
      const user = rootState.auth.authId;
      const reviewId = firebase.database().ref('reviews').push().key;
      const publishedAt = Math.floor(Date.now() / 1000);

      const review = {
        reviews: newReview,
        user,
        id: reviewId,
        publishedAt,
      };

      const updates = {};
      updates[`reviews/${reviewId}`] = review;
      firebase.database().ref().update(updates)
        .then(() => {
          commit('SET_NEW_REVIEW', reviewId);
          commit('SET_ITEM', { resource: 'posts', item: review, id: reviewId }, { root: true });
          return Promise.resolve(state.items[reviewId]);
        });
    },

    uploadImage({ state, commit, rootState }, newImage) {
      const user = rootState.auth.authId;
      const imageId = firebase.database().ref('images').push({ url: 'ss' }).key;
      const publishedAt = Math.floor(Date.now() / 1000);

      const newImageObject = {
        ...newImage,
        user,
        imageId,
        publishedAt,
      };
      console.log(imageId);
      const updates = {};
      updates[`images/${imageId}`] = newImageObject;
      firebase.database().ref('images').child(imageId).update(newImageObject)
        .then(() => {
          commit('SET_ITEM', { resource: 'posts', item: newImageObject, id: imageId }, { root: true });
          return Promise.resolve(state.items[imageId]);
        });
      return imageId;
    },

    uploadVideo({ state, commit, rootState }, newVideo) {
      const user = rootState.auth.authId;
      const videoId = firebase.database().ref('videos').push({ url: 'ss' }).key;
      const publishedAt = Math.floor(Date.now() / 1000);

      const newImageObject = {
        ...newVideo,
        user,
        videoId,
        publishedAt,
      };
      const updates = {};
      updates[`videos/${videoId}`] = newImageObject;
      firebase.database().ref('videos').child(videoId).update(newImageObject)
        .then(() => {
          commit('SET_ITEM', { resource: 'videos', item: newImageObject, id: videoId }, { root: true });
          return Promise.resolve(state.items[videoId]);
        });
      return videoId;
    },
  },
};
