<template>
  <nav class="navbar d-flex justify-content-between align-items-center">
    <a class="navbar-brand align-items-center d-flex">
      <a
        @click="$router.go(-1)"
        v-if="!this.$route.path.includes('profile') && this.$route.path !== '/'"
      >
        <i class="fas fa-angle-left mr-3" />
      </a>
      <router-link to="/">
        <img
          src="/identity/logo.png"
          :width="[notAuth ? 30 : 35]"
          :height="[notAuth ? 30 : 35]"
          class="d-inline-block align-top"
          alt
          id="logo-nav"
        />
      </router-link>
    </a>
    <div class="navbar-text overflow-auto">
      <router-link v-if="notAuth" to="/profile/me" class="d-flex justify-content-flex-end">
        <avatar :displayName="true" :verticalAlignment="true" :widthPx="25" class="nav-avatar"></avatar>
      </router-link>

      <router-link to="/login" id="login-navbar" v-else>
        <span>Log in</span>
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'TheNavBar',
  computed: {
    notAuth() {
      return this.$store.state.auth.authId;
    },
  },
};
</script>

<style lang="scss">
#login-navbar {
  font-family: $title;
  color: $alpha;
}
.navbar {
  background: #fcac00;
  padding: 0rem 1rem;
  position: fixed;
  width: 100%;
  z-index: 100;
}

@media (min-width: 1200px) {
  .navbar {
    padding: 0rem 1rem;
  }
}

.navbar-text {
  justify-self: end;
}
#logo-nav {
  filter: invert(100);
}
.nav-avatar {
  img,
  .name {
    align-self: flex-end;
  }
  .name {
    h5 {
      font-size: 0.8em;
    }
  }
}
</style>
