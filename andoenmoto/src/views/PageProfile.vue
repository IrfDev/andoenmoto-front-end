<template>
  <div class="Profile container-fluid m-0">
      <input
        v-if="itsMe"
        v-model="me.name"
        class="auth-name"
      />
      <h5
        class="text-center m-0"
        v-else
      >
        {{auth.name}}
      </h5>
      <wings-row>
        <img
        v-if="!itsMe"
        :src="auth.profile" alt="" class="img-fluid rounded-circle"
        >
        <img
          v-else
          :src="me.profile" alt="" class="img-fluid rounded-circle"
        >
      </wings-row>
      <textarea
        v-if="itsMe"
        class="auth-description"
        v-model="me.description"
        @keyup.enter="editUser"
      >
      </textarea>
      <p
        v-else
      >
        {{auth.description}}
      </p>
      <router-link class="sign-out m-4" v-if="itsMe" to="/sign-out">
        Cerrar sesión
      </router-link>
      <div class="row flex-nowrap overflow-auto mt-3">
        <div class="col">
          <profile-stats-card
            :statText="'Hola perriux'"
          />
        </div>
        <div class="col">
          <profile-stats-card
            :statText="'Hola perriux'"
          />
        </div>
        <div class="col">
          <profile-stats-card
            :statText="'Hola perriux'"
          />
        </div>
        <div class="col">
          <profile-stats-card
            :statText="'Hola perriux'"
          />
        </div>
      </div>
    <profile-badge
      :titleBadge="'Principiante'"
    />
  </div>
</template>

<script>
import ProfileStatsCard from '@/components/ui/ProfileStatsCard.vue';
import ProfileBadge from '@/components/ui/ProfileBadge.vue';

export default {
  name: 'PageProfile',
  components: {
    ProfileBadge,
    ProfileStatsCard,
  },
  props: {
    itsMe: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    signOut() {
      this.$router.push({ to: '/sign-out' });
    },
  },
  created() {
    if (!this.itsMe) {
      this.$store.dispatch('auth/findUser', this.$route.params.profileId);
    }
  },
  computed: {
    me() {
      return this.$store.state.auth.profileUser;
    },
    auth() {
      return this.$store.state.auth.otherProfile;
    },
  },
};
</script>

<style lang="scss" scoped>
.container-fluid{
  background:$main-gradient;
  min-height: 100vh;
}
.auth-name{
  max-width:80vw;
}
.auth-name, h5{
  color:$alpha-white;
  font-size:25vw;
  font-family:$typo;
  background-color:transparent;
  border:none;
  text-align:center;
}
p{
  font-family: $paragraph;
  color:$alpha-white;
}
.auth-description, p{
  background-color: transparent;
  border: none;
  color:$alpha-white;
  text-align: center;
  font-family: $paragraph;
  width:100%;
  height:10vh;
}
.sign-out{
  background-color:$alpha-white!important;
  font-family: $title;
  border-radius:8px;
  padding: 1% 5%;
  margin: 5em;
  color: red;
}
</style>
