<template>
<div
  class="row mt-3 justify-content-center"
>
    <category-badge
        :key="categoryIndex"
        v-for="(category, categoryIndex) in categories"
        :colWidth="category.colWidth"
        :name="category.name"
        :image="category.image"
        :category="category"
    />
</div>
</template>

<script>
import CategoryBadge from '@/components/ui/basics/CategoryBadge.vue';

export default {
  name: 'Categories',
  components: {
    CategoryBadge,
  },
  computed: {
    categories() {
      return this.$store.state.sourceData.categories;
    },
  },
};
</script>

<style>

</style>
