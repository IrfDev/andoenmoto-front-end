<template>
  <div>
    <div class="row  justify-content-around text-center align-items-center">
      <div class="col-4 col-md-3">
        <logo class="d-md-none" />
        <img
          src="/bgs/HomeIntro.png"
          alt="intro-andoenmoto"
          class="img-fluid d-none d-md-block m-0"
        />
      </div>
      <section class="col-12">
        <h1>Ando en moto</h1>
        <h3>Reviews and pictures for biker products</h3>
      </section>
      <div class="col-lg-5 col-md-5 col-12">
        <basic-button
          data-toggle="modal"
          :content="'Subir Reseña'"
          :main="true"
          data-target="#exampleModal"
          class="modal-button-trrigger"
        />
      </div>
      <div class="col-lg-5 col-md-5 col-12">
        <router-link to="/login">
          <basic-button
            :content="'Iniciar sesión'"
            :secondary="true"
            v-if="!notAuth"
            @click="goToLogin"
          />
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
</style>
