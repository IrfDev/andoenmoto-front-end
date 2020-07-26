<template>
  <div
    class="flex-nowrap d-flex justify-content-end"
    :class="{
      'flex-column-reverse': reverse,
      'flex-column align-content-stretch': !reverse,
      'col-12': name === 'Motocicletas',
      'col-md-3 col-4': name !== 'Motocicletas',
    }"
    @click="activateCategoryy($attrs.category)"
  >
    <div class="badge-image m-0">
      <img :src="image" :alt="name" class="img-fluid w-50" />
    </div>
    <div class="badge-title m-0">
      <h2 v-if="reverse">{{ name }}</h2>
      <h3 v-else>{{ name }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryBadge',
  methods: {
    async activateCategoryy(category) {
      if (this.$route.name !== 'categories-style') {
        await this.$store.dispatch('categories/activateCategory', category);
        this.$router.push({
          name: 'categories-style',
          params: { category: category.name },
        });
      }
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
h3,
h2 {
  color: $alpha-white;
  font-family: $title;
}
.flex-column-reverse {
  h3,
  h2 {
    font-family: $typo !important;
    color: $alpha-white;
  }
}
</style>
