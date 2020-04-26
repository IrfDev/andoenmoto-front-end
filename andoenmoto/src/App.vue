<template>
  <div id="app">
    <the-nav-bar/>
    <router-view/>
  </div>
</template>

<script>
import TheNavBar from '@/components/sections/TheNavbar.vue';

export default {
  components: {
    TheNavBar,
  },
};
</script>

<style lang="scss">
@font-face {
    font-family: 'bredan';
    src: url('../public/fonts/the-bredan-webfont.woff2') format('woff2'),
         url('../public/fonts/the-bredan-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;

}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
