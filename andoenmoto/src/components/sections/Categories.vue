<template>
  <div class="row mt-3 pb-3 justify-content-center text-center align-items-stretch m-0">
    <category-badge
      :key="category['.key']"
      class="mt-5 mb-md-5"
      v-for="category in categories"
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
      return this.$store.state.categories.items;
    },
  },
};
</script>
