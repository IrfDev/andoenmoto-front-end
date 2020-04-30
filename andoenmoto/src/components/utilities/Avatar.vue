<template>
  <div class="rounded-circle overflow-hidden img-fluid">
      <img
        :src="user.profile"
        :alt="user.profile"
        class="img-fluid w-25"
      >
      <h4
        class='d-none'
      >
        {{user.name}}
      </h4>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import firebase from 'firebase';

export default {
  name: 'Avatar',
  props: {
    displayName: Boolean,
  },
  beforeCreate() {
    firebase.database().ref('users').once('value', (snapshot) => {
      const users = snapshot.val();

      this.$store.commit('SET_USERS', users);
    });
  },
  computed: {
    ...mapGetters(
      { user: 'authUser' },
    ),
  },
};
</script>

<style>

</style>
