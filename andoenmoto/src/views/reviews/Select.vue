<template>
<div>
    <brands
      :brands="brands"
      v-if="!selected"
    />
    <styles
      v-else
      :styles="styles"
    />
</div>
</template>

<script>
export default {
  name: 'Select',
  components: {
    Styles: () => import('@/components/sections/selection/Styles.vue'),
    Brands: () => import('@/components/sections/selection/Brands.vue'),
  },
  computed: {
    selected() {
      return this.$route.params.brand;
    },
    brands() {
      return this.$store.state.sourceData.brands;
    },
    styles() {
      return this.$store.state.sourceData.styles;
    },
  },
};
</script>

<style>

</style>
