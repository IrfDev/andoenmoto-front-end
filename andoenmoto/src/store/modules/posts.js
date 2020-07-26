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
      return Object.values(state.items).filter(
        (post) => post.model === rootState.models.activeItem.id,
      );
    },

    fotosFromPosts: (state, getters) =>
      Object.values(getters.postsFromModel).map((post) => post.media.images),
  },

  mutations: {
    SET_ALL_FEATURES(state, features) {
      state.features = features;
    },

    SET_NEW_REVIEW(state, id) {
      state.newReview = id;
    },

    SET_NEW_ITEM(state, { id, item }) {
      state[id] = item;
    },
  },

  actions: {
    fetchAllFeatures({ commit, state }) {
      return new Promise((res) => {
        firebase
          .database()
          .ref('features')
          .on('value', (snapshot) => {
            const featArray = Object.keys(snapshot.val());
            commit('SET_ALL_FEATURES', featArray);
          });

        return res(state.features);
      });
    },

    fetchAllPosts({ state, commit }) {
      return new Promise((resolve) => {
        firebase
          .database()
          .ref('posts')
          .on('value', (snapshot) => {
            const categoriesObject = snapshot.val();

            Object.keys(categoriesObject).forEach((categoryId) => {
              const categoryObj = categoriesObject[categoryId];
              const category = { ...categoryObj, id: categoryId };

              commit(
                'SET_ITEM',
                { resource: 'posts', id: categoryId, item: category },
                { root: true },
              );
            });

            resolve(Object.values(state.items));
          });
      });
    },

    submitPost({ state, commit, dispatch, rootState }, newPost) {
      const user = rootState.auth.authId;
      const postId = firebase
        .database()
        .ref('posts')
        .push().key;

      const publishedAt = Math.floor(Date.now() / 1000);

      const post = {
        ...newPost,
        media: {
          images: newPost.images,
          video: newPost.video,
        },
        user,
        postId,
        publishedAt,
      };

      const updates = {};
      updates[`posts/${postId}`] = post;
      updates[`users/${post.user}/posts/${postId}`] = postId;
      firebase
        .database()
        .ref()
        .update(updates)
        .then(() => {
          commit(
            'SET_ITEM',
            { resource: 'posts', item: post, id: postId },
            { root: true },
          );

          return Promise.resolve(state.items[postId]);
        });
    },

    submitReview({ state, commit, rootState }, newReview) {
      const user = rootState.auth.authId;
      const reviewId = firebase
        .database()
        .ref('reviews')
        .push().key;
      const publishedAt = Math.floor(Date.now() / 1000);

      const review = {
        reviews: newReview,
        user,
        id: reviewId,
        publishedAt,
      };

      const updates = {};
      updates[`reviews/${reviewId}`] = review;
      firebase
        .database()
        .ref()
        .update(updates)
        .then(() => {
          commit('SET_NEW_REVIEW', reviewId);

          return Promise.resolve(state.newReview);
        });
    },

    uploadImage({ state, commit, rootState }, newImage) {
      const user = rootState.auth.authId;
      const imageId = firebase
        .database()
        .ref('images')
        .push({ url: 'ss' }).key;
      const publishedAt = Math.floor(Date.now() / 1000);

      const newImageObject = {
        ...newImage,
        user,
        imageId,
        publishedAt,
      };

      const updates = {};
      updates[`images/${imageId}`] = newImageObject;
      firebase
        .database()
        .ref('images')
        .child(imageId)
        .update(newImageObject)
        .then(() => {
          return Promise.resolve(state.items[imageId]);
        });
      return imageId;
    },

    fetchUserImages(_, userId) {
      return new Promise((resolve) => {
        firebase
          .database()
          .ref('images')
          .orderByChild('user')
          .equalTo(userId)
          .on('value', (snapshot) => {
            let images = snapshot.val();

            resolve(images);
          });
      });
    },

    uploadVideo({ state, commit, rootState }, newVideo) {
      const user = rootState.auth.authId;
      const videoId = firebase
        .database()
        .ref('videos')
        .push({ url: 'ss' }).key;
      const publishedAt = Math.floor(Date.now() / 1000);

      const newImageObject = {
        ...newVideo,
        user,
        videoId,
        publishedAt,
      };
      const updates = {};
      updates[`videos/${videoId}`] = newImageObject;
      firebase
        .database()
        .ref('videos')
        .child(videoId)
        .update(newImageObject)
        .then(() => {
          commit(
            'SET_ITEM',
            { resource: 'videos', item: newImageObject, id: videoId },
            { root: true },
          );
          return Promise.resolve(state.items[videoId]);
        });
      return videoId;
    },
  },
};
