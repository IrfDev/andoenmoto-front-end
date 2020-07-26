import firebase from 'firebase';

export default {
  namespaced: true,

  state: {
    items: {},
    authId: null,
    profileUser: {},
    otherProfile: {},
    unsubscribeAuthObserver: null,
  },

  getters: {
    authUser: (state) => state.items[state.authId],

    profileUser: (state) => (id) => state.items.find((user) => user[id])[id],

    findUser: () => (userId) =>
      new Promise((resolve) => {
        firebase
          .database()
          .ref('users')
          .child(userId)
          .once('value', (snapshot) => {
            const authUser = snapshot.val();
            resolve(authUser);
          });
      }),
  },

  mutations: {
    SET_AUTH_ID(state, id) {
      state.authId = id;
    },

    SET_PROFILE_USER(state, userAuthObject) {
      state.profileUser = userAuthObject;
    },

    SET_OTHER_USER(state, activeUser) {
      state.otherProfile = activeUser;
    },

    SET_ITEM(state, { id, item }) {
      state.items[id] = item;
    },

    SIGN_OUT(state) {
      state.authId = null;
      state.profileUser = null;
    },

    SET_UNSUSCRIBE_AUTH_OBSERVER(state, unsubscribe) {
      state.unsubscribeAuthObserver = unsubscribe;
    },
  },

  actions: {
    async fetchAuthUser({ commit, getters, dispatch }, userAuthObject) {
      const userInDB = await getters.findUser(userAuthObject.id);
      console.log('[GetUser]', userAuthObject.id);
      if (userInDB) {
        firebase
          .database()
          .ref('users')
          .child(userAuthObject.id)
          .once('value', (snapshot) => {
            const authUser = snapshot.val();

            commit('SET_PROFILE_USER', authUser);
          });
      } else {
        dispatch('authRedirectResponse');
      }
    },

    initAuthentication({ dispatch, commit, state }) {
      return new Promise((resolve) => {
        if (state.unsubscribeAuthObserver) {
          state.unsubscribeAuthObserver();
        }

        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            dispatch('fetchAuthUser', { user, id: user.uid }).then((dbUser) =>
              resolve(dbUser),
            );
          } else {
            resolve(null);
          }
        });
        commit('SET_UNSUSCRIBE_AUTH_OBSERVER', unsubscribe);
      });
    },

    findUser({ commit }, userId) {
      return new Promise((resolve) => {
        firebase
          .database()
          .ref('users')
          .child(userId)
          .once('value', (snapshot) => {
            const authUser = snapshot.val();

            commit('SET_OTHER_USER', authUser);
            resolve(authUser);
          });
      });
    },

    async fetchAuthUserId({ dispatch, commit }) {
      // console.log('[UserObject]:';
      const userId = firebase.auth().currentUser.uid;
      await dispatch('fetchAuthUser', { id: userId });
      commit('SET_AUTH_ID', userId);
    },

    registerUser(
      { commit, state },
      { email, name, username, avatar, gender = 'male', id },
    ) {
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
        firebase
          .database()
          .ref('users')
          .child(id)
          .set(user)
          .then((e) => {
            commit('SET_PROFILE_USER', user);
            commit('SET_ITEM', { resource: 'users', id, item: user });
            res(state.items[id]);
          });
      });
    },

    registerUserEmailPassword({ dispatch }, form) {
      const { email, name, username, password, avatar } = form;
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((u) => {
          dispatch('registerUser', {
            id: u.user.uid,
            name,
            username,
            avatar,
            email,
          });
        });
    },

    authRedirectResponse({ dispatch }) {
      firebase
        .auth()
        .getRedirectResult()
        .then((result) => {
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
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const { email } = error;
          const { credential } = error;
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
      commit('SIGN_OUT');
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
        firebase
          .database()
          .ref('posts')
          .child(id)
          .update(updates)
          .then(() => {
            commit('setUser', { userId: id, user: { ...user, description } });
            resolve(user);
          });
      });
    },
  },
};
