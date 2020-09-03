<template>
  <div>
    <div class="row justify-content-center text-center align-items-center">
      <div class="col-4 col-md-3">
        <logo class="d-md-none" />
        <img
          src="/bgs/HomeIntro.png"
          alt="intro-andoenmoto"
          class="img-fluid d-none d-md-block m-0 intro-andoenmoto"
        />
      </div>
      <section class="col-12">
        <h1>Ando en moto</h1>

        <h3>Upload and see reviews for motorcycle products</h3>
      </section>

      <div v-if="notAuth" class="col-lg-6 col-md-5 col-12 text-center text-lg-right">
        <basic-button
          data-toggle="modal"
          :content="'Upload review'"
          :main="true"
          data-target="#exampleModal"
          class="modal-button-trrigger"
        />
      </div>

      <div
        class="col-lg-6 col-md-5 col-12"
        :class="{
          'text-lg-left': notAuth,
          'text-lg-right text-center': !notAuth,
        }"
        @click="scrollToCategories"
      >
        <basic-button
          data-toggle="modal"
          :content="'Reviews'"
          :secondary="notAuth ? true : false"
          :main="!notAuth"
        />
      </div>

      <div v-if="!notAuth" class="col-lg-6 col-md-5 col-12 text-md-left text-center">
        <router-link to="/login">
          <basic-button :content="'Log In'" :secondary="true" @click="goToLogin" />
        </router-link>
      </div>
    </div>
    <post-form class="modal fade" />
  </div>
</template>

<script>
import logo from '@/components/ui/basics/logo.vue';

export default {
  name: 'Header',

  components: {
    PostForm: () => import('@/components/ui/basics/PostForm.vue'),
    logo,
  },

  computed: {
    notAuth() {
      return this.$store.state.auth.authId;
    },
  },

  methods: {
    goToLogin() {
      this.$analytics.logEvent('notification_received');
      this.$router.push({ name: 'login' });
    },

    scrollToCategories() {
      this.$emit('clickReviews');
    },

    openModal() {
      this.modal = false;
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  font-family: $typo;
  font-weight: $light;
}

h3 {
  font-family: $title;
  font-weight: $bold;
}

* {
  color: $alpha-white;
}

.intro-andoenmoto {
  animation: createAnimations 0.7s forwards 0s ease-out;
}

@keyframes createAnimations {
  0% {
    transform: rotate(0) scale(0.5) translateX(20em);
  }
  100% {
    transform: rotate(0) scale(1);
  }
}
</style>
