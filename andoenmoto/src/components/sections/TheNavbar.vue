<template>
<nav class="navbar d-flex justify-content-between">
  <a class="navbar-brand" href="#">
    <img src="/identity/logo.png" width="30" height="30" class="d-inline-block align-top" alt="">
  </a>
  <span class="navbar-text d-flex justify-content-end">
      <avatar
        :displayName="false"
        style="max-width:100px;"
      />
    </span>
</nav>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TheNavBar',
  computed: {
    ...mapGetters(
      { user: 'authUser' },
    ),
  },
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
