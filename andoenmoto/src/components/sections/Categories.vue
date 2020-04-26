<template>
<div class="row mt-3 justify-content-center">
    <category-badge
        @click="console.log(category)"
        v-for="(category, categoryIndex) in categories"
        :key="categoryIndex"
        :colWidth="category.colWidth"
        :name="category.name"
        :image="category.image"
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
  methods: {
    activateCategory(category) {
      console.log(category);
      this.$store.dispatch('activateCategoryy', category);
    },
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
