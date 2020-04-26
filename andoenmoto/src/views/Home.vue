<template>
  <div class="container-fluid">
    <Header class="pb-3"/>
    <categories/>
  </div>
</template>

<script>
import Header from '@/components/sections/Header.vue';
import Categories from '@/components/sections/Categories.vue';

import firebase from 'firebase';

export default {
  name: 'Home',
  components: {
    Header,
    Categories,
  },
  beforeCreate() {
    firebase.database().ref('categories').once('value', (snapshot) => {
      const categories = snapshot.val();

      this.$store.commit('SET_CATEGORIES', categories);
    });
  },
};
</script>

<style lang="scss" scoped>
*{
  background:$alpha;
  // height:100vh;
}
</style>
