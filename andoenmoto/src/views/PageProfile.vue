<template>
  <div class="Profile container-fluid m-0">
    <input v-if="itsMe" v-model="me.name" class="auth-name" />
    <h5 class="text-center m-0" v-else>{{ auth.name }}</h5>

    <wings-row>
      <img
        v-if="!itsMe"
        :src="auth.profile"
        alt
        class="img-fluid rounded-circle"
      />
      <img v-else :src="me.profile" alt class="img-fluid rounded-circle" />
    </wings-row>

    <textarea
      v-if="itsMe"
      class="auth-description"
      v-model="me.description"
      @keyup.enter="editUser"
    ></textarea>
    <p v-else>{{ auth.description }}</p>

    <router-link class="sign-out m-4" v-if="itsMe" to="/sign-out"
      >Cerrar sesión</router-link
    >

    <!-- <h3>Images</h3> -->
    <div class="row flex-nowrap overflow-auto mt-3">
      <div
        v-for="imageObject in images"
        :key="imageObject.imageId"
        class="col-4"
      >
        <img
          :src="imageObject.url"
          :alt="imageObject.model"
          class="img-fluid"
        />
      </div>
    </div>
    <profile-badge :titleBadge="'Principiante'" />
  </div>
</template>

<script>
// import ProfileStatsCard from '@/components/ui/ProfileStatsCard.vue';
import ProfileBadge from '@/components/ui/ProfileBadge.vue';
import { mapState } from 'vuex';

export default {
  name: 'PageProfile',

  components: {
    ProfileBadge,
  },

  async created() {
    if (!this.itsMe) {
      this.$store.dispatch('auth/findUser', this.$route.params.profileId);

      let images = await this.$store.dispatch(
        'posts/fetchUserImages',
        this.$route.params.profileId
      );

      this.images = Object.values(images);
    } else {
      let images = await this.$store.dispatch(
        'posts/fetchUserImages',
        this.me.id
      );

      this.images = Object.values(images);
    }
  },

  props: {
    itsMe: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    ...mapState({
      me: (state) => state.auth.profileUser,

      auth: (state) => state.auth.otherProfile,
    }),
  },

  data() {
    return {
      images: [],
    };
  },

  methods: {
    signOut() {
      this.$router.push({ to: '/sign-out' });
    },
  },
};
</script>

<style lang="scss" scoped>
.container-fluid {
  background: $main-gradient;
  min-height: 100vh;
}

.auth-name {
  max-width: 80vw;
}

.auth-name,
h5 {
  color: $alpha-white;
  font-family: $typo;
  background-color: transparent;
  border: none;
  text-align: center;
}

p {
  font-family: $paragraph;
  color: $alpha-white;
}

.auth-description,
p {
  background-color: transparent;
  border: none;
  color: $alpha-white;
  text-align: center;
  font-family: $paragraph;
  width: 100%;
  height: 10vh;
}

.sign-out {
  background-color: $alpha-white !important;
  font-family: $title;
  border-radius: 8px;
  padding: 1% 5%;
  margin: 5em;
  color: red;
}
</style>
