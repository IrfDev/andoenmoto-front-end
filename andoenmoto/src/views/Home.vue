<template>
  <div class="container-fluid home justify-content-center align-items-center">
    <Header class="pb-3" @clickReviews="scrollToCategories" />
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
    scrollToCategories() {
      let el = this.$el.getElementsByClassName('categories-home')[0];

      el.scrollIntoView({ behavior: 'smooth' });
    },

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

  metaInfo() {
    return {
      title: 'Home | AndoEnMoto 🏍',
      meta: [
        {
          name: 'description',
          content:
            'AndoEnMoto is the webapp for upload your reviews for Motorcycle products. Helmets, Jackets, Bikes, etc.',
        },
        {
          property: 'og:title',
          content: 'AndoEnMoto',
        },
        { property: 'og:site_name', content: 'AndoEnMoto' },
        { property: 'og:type', content: 'website' },
        { name: 'robots', content: 'index,follow' },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.home {
  min-height: 100vh;
  padding-top: 15%;
  @media screen and (min-width: 800px) {
    padding-top: 05%;
  }
}
* {
  background: $alpha;
}
</style>
