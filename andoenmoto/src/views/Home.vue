<template>
  <div v-if="asyncDataStatus_ready" class="container-fluid">
    <Header class="pb-3"/>
    <categories/>
  </div>
  <div v-else class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
    <span class="sr-only"></span>
  </div>
</template>

<script>
import Header from '@/components/sections/Header.vue';
import Categories from '@/components/sections/Categories.vue';

import { mapActions } from 'vuex';

import asyncDataStatus from '@/mixins/asyncDataStatus';

export default {
  name: 'Home',
  components: {
    Header,
    Categories,
  },
  methods: {
    ...mapActions(['categories/fetchAllCategories', 'auth/authRedirectResponse']),
  },
  mixins: [asyncDataStatus],
  async created() {
    await this.fetchAllCategories();
    this.asyncDataStatus_fetched();
  },
};
</script>

<style lang="scss" scoped>
*{
  background:$alpha;
}
</style>
