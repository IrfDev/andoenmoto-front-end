<template>
  <div class="row m-0 justify-content-center">
    <div
      class="col-md-4 mt-4 col-10 brand-wrapper align-content-center brand-column"
      v-for="(brand, brandIndex) in brands"
      :key="brandIndex"
      @click="brandSelected(brand)"
    >
      <brand-card :brand="brand.name" class="mt-3" />
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

  props: {
    brands: {
      type: [Object, Array],
      required: true,
    },
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
};
</script>

<style lang="scss" scoped></style>
