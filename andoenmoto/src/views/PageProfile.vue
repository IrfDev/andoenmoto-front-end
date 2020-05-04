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
      <div class="row align-items-center">
        <div class="col-3">
          <img src="/images/util/left-wing.png" alt="">
        </div>
        <div class="col-6">
          <img
          v-if="!itsMe"
          :src="auth.profile" alt="" class="img-fluid"
          >
          <img
            v-else
            :src="me.profile" alt="" class="img-fluid"
          >
        </div>
        <div class="col-3">
          <img src="/images/util/right-wing.png" alt="">
        </div>
      </div>
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
      <button @click="signOut" class="sign-out" v-if="itsMe">
        Sign Out
      </button>
      <div class="row flex-nowrap overflow-auto">
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
      this.$store.dispatch('auth/signOut');
    },
  },
  created() {
    if (!this.itsMe) {
      this.$store.dispatch('auth/fetchAuthUser', this.$route.params.profileId);
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
}
</style>
