<template>
  <div id="app">
    <the-nav-bar />
    <main>
      <router-view :key="$route.path" />
    </main>
    <footer-section />
  </div>
</template>

<script>
import TheNavBar from '@/components/sections/TheNavbar.vue';
import FooterSection from '@/components/sections/FooterSection.vue';

export default {
  components: {
    TheNavBar,
    FooterSection,
  },
};
</script>

<style lang="scss">
.slide-fade-enter-active {
  transition: all 0.3s ease-in-out;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0.95;
}

html {
  background-color: #292929;
}

@font-face {
  font-family: 'bredan';
  src: url('../public/fonts/the-bredan-webfont.woff2') format('woff2'),
    url('../public/fonts/the-bredan-webfont.woff') format('woff');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
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

@keyframes yourAnimation {
  0% {
    opacity: 0;
  }
  98% {
    opacity: 1;
  }
}

.item-animate {
  animation: yourAnimation 1s forwards 0s linear;
}
</style>
