<template>
  <div class="container-fluid">
    <Header class="pb-3"/>
    <categories/>
  </div>
</template>

<script>
import Header from '@/components/sections/Header.vue';
import Categories from '@/components/sections/Categories.vue';

export default {
  name: 'Home',
  components: {
    Header,
    Categories,
  },
};
</script>

<style lang="scss" scoped>
*{
  background:$alpha;
  // height:100vh;
}
</style>
