import firebase from 'firebase';

export default {
  namespaced: true,

  state: {
    items: {},
    authId: null,
  },

  getters: {
    authUser: (state) => state.items[state.authId],

    profileUser: (state) => (id) => state.items
      .find((user) => user[id])[id],
  },

  mutations: {
    SET_AUTH_ID(state, id) {
      state.authId = id;
    },

    SET_PROFILE_USER(state, activeUser) {
      state.profileUser = activeUser;
    },
  },

  actions: {
    findUser({ commit, getters }, userId) {
      const activeUser = getters.profileUser(userId);
      commit('SET_PROFILE_USER', activeUser);
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
            res(state.items[id]);
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
        }
      // The signed-in user info.
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const { email } = error;
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

    signOut({ commit }) {
      firebase.auth().signOut();
      commit('SET_AUTH_ID', null);
    },

    updateUser({ state, commit }, { id, description }) {
      return new Promise((resolve) => {
        const user = state.items[id];
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
};
