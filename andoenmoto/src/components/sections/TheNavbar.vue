<template>
<nav class="navbar d-flex justify-content-between">
  <a class="navbar-brand">
    <router-link to="/">
      <img
        src="/identity/logo.png"
        width="30"
        height="30"
        class="d-inline-block align-top"
        alt=""
        id="logo-nav"
      >
    </router-link>
  </a>
  <span class="navbar-text">
    <router-link
      to="/profile/me"
      class="d-flex justify-content-flex-end"
      v-if="notAuth"
    >
      <avatar
        :displayName="true"
        :verticalAlignment="true"
        class="nav-avatar"
      />
    </router-link>

    <router-link
      to="/login"
      id="login-navbar"
      v-else
    >
      Iniciar sesión
    </router-link>
    </span>
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
#login-navbar{
  font-family: $title;
  color: $alpha;
}
.navbar {
  background: #FCAC00;
  padding: 0.1rem 1rem;
}
.navbar-text{
  justify-self: end;
}
#logo-nav{
  filter: invert(100);
}
.nav-avatar{
  img, .name{
    align-self: flex-end!important;
  }
  .name{
    h4{
      color: black;
      font-size:3vw;
      font-weight: 400;
    }
  }
}
</style>
