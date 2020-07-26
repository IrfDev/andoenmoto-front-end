<template>
  <div class="container-fluid pt-3 home">
    <Header class="pb-3" />
    <categories v-if="asyncDataStatus_ready" />
    <div v-else class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
      <span class="sr-only"></span>
    </div>
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
    ...mapActions({
      fetchAllCategories: 'categories/fetchAllCategories',
      authRedirectResponse: 'auth/authRedirectResponse',
    }),
  },
  mixins: [asyncDataStatus],
  async created() {
    await this.fetchAllCategories();
    this.asyncDataStatus_fetched();
  },
};
</script>

<style lang="scss" scoped>
.home {
  min-height: 100vh;
}
* {
  background: $alpha;
}
</style>
