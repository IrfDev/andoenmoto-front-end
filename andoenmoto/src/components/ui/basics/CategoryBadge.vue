<template>
  <div
    :class="[
    `col-${colWidth} flex-nowrap d-flex`,
    reverse ? 'flex-column-reverse' : 'flex-column align-content-stretch']"
    @click="activateCategoryy($attrs.category)"
  >
    <div class="badge-image m-0">
      <img :src="image" :alt="name" class="img-fluid">
    </div>
    <div class="badge-title m-0">
      <h4 class="">{{name}}</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryBadge',
  methods: {
    async activateCategoryy(category) {
      await this.$store.dispatch('categories/activateCategory', category);
      this.$router.push({
        name: 'categories-style',
        params: { category: category.name },
      });
    },
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    colWidth: {
      type: Number,
    },
    reverse: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
h4{
  color:$alpha-white;
  font-family: $title;
  font-size:5vw;
}
.flex-column-reverse{
  h4{
    font-family: $typo!important;
    font-size: 25vw;
    color:$alpha-white;
  }
}
</style>
