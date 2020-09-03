<template>
  <div
    class="row mt-3 mt-lg-0 pb-3 justify-content-center text-center align-items-stretch m-0 categories-home"
  >
    <div class="col-12 mt-2 mb-3">
      <h2 class="title-section">Select a category</h2>
    </div>
    <category-badge
      :key="category['.key']"
      class="mb-5 mb-md-5 category-badge-home"
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
<style lang="scss" scoped>
.categories-home {
  padding-top: 0;
  .title-section {
    font-family: $typo;
    color: $alpha-white;
  }
  @media screen and (min-width: 800px) {
    padding: 17%;
    padding-top: 0;
    .category-badge-home {
      font-size: 0.7em;
    }
  }
}
</style>