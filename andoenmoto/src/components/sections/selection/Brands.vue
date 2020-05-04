<template>
<div class="row m-0 justify-content-center">
  <div
    class="col-md-6 col-10"
    v-for="(brand, brandIndex) in brands"
    :key="brandIndex"
    @click="brandSelected(brand)"
  >
      <brand-card
        :brand="brand.name"
        class="mt-3"
      />
  </div>
</div>
</template>

<script>
import BrandCard from '@/components/ui/BrandCard.vue';

export default {
  name: 'Brands',
  components: {
    BrandCard,
  },
  methods: {
    async brandSelected(brand) {
      this.$store.commit('brands/SET_ACTIVE_BRAND', brand);
      if (this.$route.name === 'categories-style') {
        this.$router.push({
          name: 'category-styles',
          params: {
            brand: brand.name,
          },
        });
      } else {
        this.$router.push({
          name: 'categories-style-models',
          params: {
            brand: brand.name,
            category: this.$route.params.category,
            style: this.$route.params.style,
          },
        });
      }
    },
  },
  props: {
    brands: {
      type: [Object, Array],
      required: true,
    },
  },
};
</script>

<style>

</style>
