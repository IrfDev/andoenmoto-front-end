<template>
  <div
    :class="`col-${colWidth} flex-nowrap align-content-stretch`"
    @click="activateCategoryy($attrs.category)"
  >
      <img :src="image" :alt="name" class="img-fluid">
      <h4 class="mt-2">{{name}}</h4>
  </div>
</template>

<script>
export default {
  name: 'CategoryBadge',
  methods: {
    async activateCategoryy(category) {
      await this.$store.dispatch('activateCategory', category);
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
  },
};
</script>

<style lang="scss" scoped>
h4{
  color:$alpha-white;
  font-family: $title;
  font-size:5vw;
}
</style>
