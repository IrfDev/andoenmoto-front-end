import Vue from 'vue';
import Vuex from 'vuex';

import firebase from 'firebase';

import sourceData from '../lib/data.json';

Vue.use(Vuex);

export default new Vuex.Store(
  {
    state: {
      sourceData,
      activeCategory: {},
      activeStyle: {},
      activeBrand: {},
      activeModel: {},
      categories: {},
      posts: {},
      users: {},
      models: {},
      brands: {},
      styles: {},
      authId: null,
      profileUser: {},
    },

    getters: {
      authUser: (state) => state.users[state.authId],

      profileUser: (state) => (id) => state.users
        .find((user) => user[id])[id],

      activeCategory: (state) => (categoryName) => Object.values(state.categories)
        .find((category) => category.name === categoryName),

      brandsFromActiveStyleId: (state) => Object.values(state.brands)
        .filter((brand) => brand.styles[state.activeStyle.id]),

      modelsFromBrandAndCategory: (state) => Object.values(state.models)
        .filter((model) => model.brand === state.activeBrand.id
        && model.category === state.activeCategory.id
        && model.style === state.activeStyle.id),

      postsFromModel: (state) => Object.values(state.posts)
        .filter((post) => post.model === state.activeModel.id),

      fotosFromPosts: (state, getters) => Object.values(getters.postsFromModel)
        .map((post) => Object.values(post.media.images)
          .map((foto) => foto.url)),
    },

    actions: {
      activateCategory({ commit }, category) {
        commit('SET_ACTIVE_CATEGORY', category);
      },

      fetchCategories({ dispatch }, ids) {
        return dispatch('fetchItems', { resource: 'categories', ids });
      },

      fetchStyles({ dispatch, state }, ids) {
        state.styles = {};
        dispatch('fetchItems', { resource: 'styles', ids });
      },

      fetchBrands({ dispatch, state }, ids) {
        state.brands = {};
        dispatch('fetchItems', { resource: 'brands', ids });
      },

      findUser({ commit, getters }, userId) {
        const activeUser = getters.profileUser(userId);
        commit('SET_PROFILE_USER', activeUser);
      },

      findCategory({ commit, getters }, categoryName) {
        const category = getters.activeCategory(categoryName);
        commit('SET_ACTIVE_CATEGORY', category);
      },

      fetchAllCategories({ state, commit }) {
        return new Promise((resolve) => {
          firebase.database().ref('categories').once('value', (snapshot) => {
            const categoriesObject = snapshot.val();
            Object.keys(categoriesObject).forEach((categoryId) => {
              const categoryObj = categoriesObject[categoryId];
              const category = { ...categoryObj, id: categoryId };
              commit('SET_ITEM', { resource: 'categories', id: categoryId, item: category });
            });
            resolve(Object.values(state.categories));
          });
        });
      },

      fetchAllStyles({ state, commit }) {
        return new Promise((resolve) => {
          firebase.database().ref('styles').once('value', (snapshot) => {
            const categoriesObject = snapshot.val();
            Object.keys(categoriesObject).forEach((categoryId) => {
              const categoryObj = categoriesObject[categoryId];
              const category = { ...categoryObj, id: categoryId };
              commit('SET_ITEM', { resource: 'styles', id: categoryId, item: category });
            });
            resolve(Object.values(state.styles));
          });
        });
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
            resolve(Object.values(state.brands));
          });
        });
      },

      fetchAllPosts({ state, commit }) {
        return new Promise((resolve) => {
          firebase.database().ref('posts').on('value', (snapshot) => {
            const categoriesObject = snapshot.val();
            Object.keys(categoriesObject).forEach((categoryId) => {
              const categoryObj = categoriesObject[categoryId];
              const category = { ...categoryObj, id: categoryId };
              commit('SET_ITEM', { resource: 'posts', id: categoryId, item: category });
            });
            resolve(Object.values(state.brands));
          });
        });
      },

      submitPost({ state, commit }, newPost) {
        const user = state.authId;
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
            commit('SET_ITEM', { resource: 'posts', item: post, id: postId });
            // commit('appendPostToUser', { parentId: post.userId, childId: postId })
            return Promise.resolve(state.posts[postId]);
          });
      },

      async fetchAuthUser({ dispatch, commit }) {
        const userId = firebase.auth().currentUser.uid;
        await dispatch('fetchUser', { id: userId });
        commit('SET_AUTH_ID', userId);
      },

      registerUser({ commit, state }, {
        email, name, username, avatar, gender = 'male', id,
      }) {
        return new Promise((res) => {
          const registeredAt = Math.floor(Date.now() / 1000);
          const usernameLower = username.toLowerCase();
          const emailLower = email.toLowerCase();
          const user = {
            profile: avatar,
            name,
            description: 'Biker amante de las motos',
            id,
            email: emailLower,
            gender,
            username: usernameLower,
            registeredAt,
            posts: {},
          };
          firebase.database().ref('users').child(id).set(user)
            .then((e) => {
              console.log(user, e);
              commit('SET_ITEM', { resource: 'users', id, item: user });
              res(state.users[id]);
            });
        });
      },

      registerUserEmailPassword({ dispatch }, form) {
        const {
          email, name, username, password, avatar,
        } = form;
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then((u) => {
            dispatch('registerUser', {
              id: u.user.uid, name, username, avatar, email,
            });
            console.log(u);
          });
      },

      authRedirectResponse({ dispatch }) {
        firebase.auth().getRedirectResult().then((result) => {
          console.log(result);
          if (result.additionalUserInfo) {
            const {
              gender,
              name,
              email,
              picture,
            } = result.additionalUserInfo.profile;

            dispatch('registerUser', {
              name: result.additionalUserInfo.profile.first_name,
              username: name,
              description: 'Esta es mi descripción',
              gender,
              email,
              id: result.user.uid,
              avatar: picture.data.url,
            });
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            const token = result.credential.accessToken;
            console.log(token);
            console.log(name);
            // ...
          }
        // The signed-in user info.
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const { email } = error;
          // The firebase.auth.AuthCredential type that was used.
          const { credential } = error;
          console.log(errorCode, errorMessage, email, credential);
          // ...
        });
      },

      registerUserFacebook() {
        const provider = new firebase.auth.FacebookAuthProvider()
          .addScope('public_profile')
          .addScope('user_birthday')
          .addScope('user_gender')
          .addScope('user_location');
        firebase.auth().signInWithRedirect(provider);
      },

      fetchAllModels({ state, commit }) {
        return new Promise((resolve) => {
          firebase.database().ref('models').once('value', (snapshot) => {
            const categoriesObject = snapshot.val();
            Object.keys(categoriesObject).forEach((categoryId) => {
              const categoryObj = categoriesObject[categoryId];
              const category = { ...categoryObj, id: categoryId };
              commit('SET_ITEM', { resource: 'models', id: categoryId, item: category });
            });
            resolve(Object.values(state.brands));
          });
        });
      },

      fetchItem({ state, commit }, { id, resource }) {
        return new Promise((resolve) => {
          firebase.database().ref(resource).child(id).once('value', (snapshot) => {
            const itemObj = snapshot.val();
            const item = { ...itemObj, id };
            commit('SET_ITEM', { resource, id: snapshot.key, item });
            resolve(state[resource][id]);
          });
        });
      },

      fetchItems({ dispatch }, { ids, resource }) {
        // ids = Array.isArray(ids) ? ids : Object.keys(ids);
        return Promise.all(ids.map((id) => dispatch('fetchItem', { id, resource })));
      },

      updateUser({ state, commit }, { id, description }) {
        return new Promise((resolve) => {
          const user = state.users[id];
          commit('setPost', {
            postId: id,
            user: {
              ...user,
              description,
            },
          });
          resolve(user);

          const updates = { description };
          firebase.database().ref('posts').child(id).update(updates)
            .then(() => {
              commit('setUser', { userId: id, user: { ...user, description } });
              resolve(user);
            });
        });
      },
    },

    mutations: {
      SET_AUTH_ID(state, id) {
        state.authId = id;
      },
      SET_ACTIVE_CATEGORY(state, category) {
        state.activeCategory = category;
      },
      SET_ACTIVE_STYLE(state, style) {
        state.activeStyle = style;
      },
      SET_ACTIVE_BRAND(state, brand) {
        state.activeBrand = brand;
      },
      SET_ACTIVE_MODEL(state, model) {
        state.activeModel = model;
      },
      SET_PROFILE_USER(state, activeUser) {
        state.profileUser = activeUser;
      },
      SET_CATEGORIES(state, cateogories) {
        state.categories = Object.values(cateogories);
      },
      SET_ITEM(state, { item, resource, id }) {
        Vue.set(state[resource], id, item);
      },
      SET_USERS(state, users) {
        state.users = users;
      },
      SET_BRANDS(state, brands) {
        state.brands = brands;
      },
      SET_MODELS(state, models) {
        state.models = models;
      },
      SET_STYLES(state, styles) {
        state.styles = styles;
      },
      SET_BRAND(state, brand) {
        Vue.set(state.users, brand);
      },
      PUSH_STYLE(state, brand) {
        Vue.set(state.stylesB, brand);
      },
    },
  },
);
