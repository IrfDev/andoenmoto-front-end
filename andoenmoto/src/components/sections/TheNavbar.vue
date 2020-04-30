<template>
<nav class="navbar d-flex justify-content-between">
  <a class="navbar-brand">
    <router-link to="/">
      <img src="/identity/logo.png" width="30" height="30" class="d-inline-block align-top" alt="">
    </router-link>
  </a>
  <span class="navbar-text">
    <router-link to="/profile/me" class="d-flex justify-content-end">
      <avatar
        :displayName="false"
      />
        <!-- style="max-width:50px;" -->
    </router-link>
    </span>
</nav>
</template>

<script>
export default {
  name: 'TheNavBar',
};
</script>

<style lang="scss">
.navbar {
    background:$complementary-gradient;
}
.navbar-text{
  justify-self: end;
}
</style>
