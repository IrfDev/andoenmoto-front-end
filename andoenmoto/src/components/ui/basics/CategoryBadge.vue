<template>
  <div
    class="flex-nowrap d-flex justify-content-end"
    :class="{
      'flex-column-reverse col-md-5 col-lg-5 col-12': reverse,

      'flex-column align-content-stretch category-home': !reverse,

      'col-12 col-lg-10 flex-grow-1 motocicletas':
        name === 'Motocicletas' && !reverse,

      'col-md-3 col-4': name !== 'Motocicletas' && !reverse,
    }"
    @click="activateCategoryy($attrs.category)"
  >
    <div class="badge-image m-0">
      <img :src="image" :alt="name" class="img-fluid w-50" />
    </div>

    <div class="badge-title m-0">
      <h2 v-if="reverse">{{ name | translateName }}</h2>
      <h3 v-else>{{ name | translateName }}</h3>
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

  filters: {
    translateName: (name) => {
      switch (name) {
        case 'Motocicletas':
          return 'Motorcycles';
        case 'Accesorios':
          return 'Accesories';
        case 'Refacciones':
          return 'Parts';

        default:
          return name;
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
.category-home {
  cursor: pointer;
  transition: 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  img,
  h2,
  h3 {
    transition: 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  }
  &:hover {
    img,
    h2,
    h3 {
      filter: invert(100%);
      transition: 0.8s cubic-bezier(0.23, 1, 0.32, 1);
    }

    background-color: $complementary;
    border-radius: 8px;
    transition: 1s cubic-bezier(0.23, 1, 0.32, 1);
  }
}

.motocicletas {
  flex-basis: 100%;
}

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
