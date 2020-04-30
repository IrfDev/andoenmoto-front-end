<template>
<div>
    <brands
      :brands="brands"
      v-if="!selected"
    />
    <styles
      :styles="styles"
      v-else
    />
</div>
</template>

<script>
// import firebase from 'firebase';

export default {
  name: 'Select',
  components: {
    Styles: () => import('@/components/sections/selection/Styles.vue'),
    Brands: () => import('@/components/sections/selection/Brands.vue'),
  },
  beforeCreate() {
    if (this.$route.params.brand) {
      this.$store.dispatch('fetchStyles', Object.keys(this.$store.state.activeBrand.styles));
    } else {
      this.$store.dispatch('fetchAllBrands');
    }
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
