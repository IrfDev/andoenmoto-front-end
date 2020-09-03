<template>
  <footer class="d-flex row m-0 justify-content-lg-between align-items-center">
    <div class="col-lg-4 col-12 mt-lg-0 mt-4">
      <img class="img-fluid" src="/identity/logo.png" alt="AndoEnMoto Logo" />
      <h4>A motorcycle startup to help bikers shop better</h4>

      <a href="mailto:hello@irving.digital">hello@andoenmoto.club</a>
    </div>
    <div class="col-lg-2 col-6 mt-lg-0 mt-4">
      <h4>Categories:</h4>
      <ul>
        <li v-for="(category, categoryIndex) in categories" :key="categoryIndex">
          <router-link :to="`/categoria/${category}`">{{category | translateName}}</router-link>
        </li>
      </ul>
    </div>
    <div class="col-lg-2 col-6">
      <h4>Profile:</h4>
      <ul>
        <li>
          <router-link to="/login">Log in</router-link>
        </li>
        <li>
          <router-link to="/register">Register</router-link>
        </li>
      </ul>
    </div>
    <div class="col-lg-2 col-12 text-lg-right text-center">
      <img src="/home/real-biker.png" alt="Real biker" class="img-fluid real-biker" />
      <h3>For real bikers</h3>
    </div>
  </footer>
</template>

<script>
import asyncDataStatus from '@/mixins/asyncDataStatus';

export default {
  name: 'Footer',

  mixins: [asyncDataStatus],

  computed: {
    categories() {
      return [
        'Motocicletas',
        'Helmets',
        'Footwear',
        'Accesorios',
        'Refacciones',
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
footer {
  background-color: $complementary;
  padding: 1% 0;
  width: 100%;
  img:not(.real-biker) {
    max-height: 3em;
    filter: invert(100%);
  }
  overflow: hidden;

  a {
    color: $alpha;
    font-family: $paragraph;
  }

  col-2 {
    height: 100%;
  }

  ul {
    list-style: none;
    margin: none;
    padding: 0;
    font-family: $paragraph;
  }
  .real-biker {
    max-height: 8em;
  }
  h3 {
    font-family: $typo;
  }

  h4 {
    font-family: $title;
  }
  p {
    font-family: $paragraph;
    font-size: 70%;
  }
}
</style>