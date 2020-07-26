<template>
  <div
    class="container-fluid"
    :class="{ style: categoryStyle, category: !categoryStyle }"
  >
    <div v-if="asyncDataStatus_ready" class="category-content pb-5">
      <div class="row justify-content-center text-center">
        <div
          class="col-12 justify-content-center align-items-center d-flex flex-column"
        >
          <img
            src="/identity/stars.png"
            class="img-fluid m-0"
            alt="AndoEnMoto-stars"
          />
          <category-badge
            :colWidth="category.colWidth"
            :image="category.image"
            :name="category.name"
            class="category-badge mt-0"
            :reverse="true"
          />
        </div>
        <toggle-button
          v-model="categoryStyle"
          :font-size="15"
          :margin="5"
          :height="40"
          :width="180"
          :value="false"
          class="mt-4"
          :color="{ checked: '#303030', unchecked: '#353E28' }"
          :sync="false"
          :labels="{ checked: 'Ver estílos', unchecked: 'Ver marcas' }"
        />
      </div>
      <styles v-if="!categoryStyle" :styles="styless" />
      <brands v-else :brands="brands" />
    </div>
    <div
      v-else
      class="spinner-border color-light"
      style="width: 3rem; height: 3rem;"
      role="status"
    >
      <span class="sr-only"></span>
    </div>
  </div>
</template>

<script>
import CategoryBadge from '@/components/ui/basics/CategoryBadge.vue';
import Styles from '@/components/sections/selection/Styles.vue';
import Brands from '@/components/sections/selection/Brands.vue';

import { mapActions, mapState } from 'vuex';
import asyncDataStatus from '@/mixins/asyncDataStatus';

export default {
  name: 'Categoriess',
  components: {
    CategoryBadge,
    Brands,
    Styles,
  },
  mixins: [asyncDataStatus],
  methods: {
    ...mapActions({
      findCategory: 'categories/findCategory',
      fetchBrands: 'brands/fetchBrands',
      fetchStyles: 'styles/fetchStyles',
    }),
  },
  async beforeMount() {
    await this.findCategory(this.$route.params.category);
    await this.fetchBrands(
      Object.keys(this.$store.state.categories.activeItem.brands),
    );
    await this.fetchStyles(
      Object.keys(this.$store.state.categories.activeItem.styles),
    );

    this.asyncDataStatus_fetched();
  },
  computed: {
    ...mapState({
      category: (state) => state.categories.activeItem,

      brands: (state) => state.brands.items,

      styless: (state) => state.styles.items,
    }),
  },
  data() {
    return {
      categoryStyle: true,
    };
  },
};
</script>

<style lang="scss" scoped>
.category {
  background: white;
  transition: 1s ease-in;
  .category-badge {
    filter: invert(100%);
  }
}
.style {
  background: $main-gradient;
  transition: 1s ease-in;
}
.container-fluid {
  min-height: 100vh !important;
}
</style>
