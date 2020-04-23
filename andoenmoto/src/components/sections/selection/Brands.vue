<template>
<div class="row justify-content-center">
    <div class="col-md-6 col-12" v-for="(brand, brandIndex) in brands" :key="brandIndex">
        <brand-card
            :brand="brand"
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
  props: {
    brands: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style>

</style>
