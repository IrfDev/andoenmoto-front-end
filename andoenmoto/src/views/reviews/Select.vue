<template>
<div v-if="asyncDataStatus_ready">
    <brands
      :brands="brands"
      v-if="!selected"
    />
    <styles
      :styles="styles"
      v-else
    />
</div>
<div v-else class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
  <span class="sr-only"></span>
</div>
</template>

<script>
import { mapActions } from 'vuex';
import asyncDataStatus from '@/mixins/asyncDataStatus';

export default {
  name: 'Select',
  components: {
    Styles: () => import('@/components/sections/selection/Styles.vue'),
    Brands: () => import('@/components/sections/selection/Brands.vue'),
  },
  mixins: [asyncDataStatus],
  methods: {
    ...mapActions([
      'fetchStyles',
      'fetchAllBrands',
    ]),
  },
  created() {
    if (this.$route.params.brand) {
      this.fetchStyles(Object.keys(this.$store.state.activeBrand.styles));
    } else {
      this.fetchAllBrands();
    }
    this.asyncDataStatus_fetched();
  },
  computed: {
    selected() {
      return this.$route.params.brand;
    },
    brands() {
      return this.$store.getters.brandsFromActiveStyleId;
    },
    styles() {
      return Object.values(this.$store.state.styles);
    },
  },
};
</script>

<style>

</style>
