<template>
  <div
    v-if="asyncDataStatus_ready"
    class="container-fluid text-center select-view"
    :class="{ style: !selected, brands: selected }"
  >
    <div class="row m-0">
      <div class="col-12 mt-4">
        <wings-row>
          <h2 class="typo-font-siz title wingie">{{ activeCategory.name | translateName }}</h2>
        </wings-row>
        <h3>{{ !selected ? activeStyle.title : activeBrand.name }}</h3>
      </div>
    </div>
    <brands :brands="brands" v-if="!selected" />
    <styles :styles="styles" v-else />
  </div>
  <div v-else class="container-fluid style">
    <wings-row>
      <div class="spinner-border text-light" style="width: 3rem; height: 3rem;" role="status">
        <span class="sr-only"></span>
      </div>
    </wings-row>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import asyncDataStatus from '@/mixins/asyncDataStatus';

export default {
  name: 'Select',
  components: {
    Styles: () => import('@/components/sections/selection/Styles.vue'),
    Brands: () => import('@/components/sections/selection/Brands.vue'),
  },
  mixins: [asyncDataStatus],
  methods: {
    ...mapActions({
      fetchStyles: 'styles/fetchStyles',

      findCategory: 'categories/findCategory',

      findAndActiveBrand: 'brands/findAndActiveBrand',

      findAndActiveStyle: 'styles/findAndActiveStyle',

      fetchCategoryStyleBrands: 'brands/fetchCategoryStyleBrands',
    }),
  },
  async mounted() {
    await this.findCategory(this.$route.params.category);

    if (this.$route.params.brand) {
      await this.findAndActiveBrand(this.$route.params.brand);

      const brandStyles = Object.keys(
        this.$store.state.brands.activeItem.styles
      );

      const categoryStyles = Object.keys(
        this.$store.state.categories.activeItem.styles
      );

      const stylesTofetch = categoryStyles.filter((style) =>
        brandStyles.includes(style)
      );

      await this.fetchStyles(stylesTofetch);
    } else {
      await this.findAndActiveStyle(this.$route.params.style);

      await this.fetchCategoryStyleBrands();
    }

    this.asyncDataStatus_fetched();
  },

  metaInfo() {
    return {
      title: `${this.activeCategory.name} category | AndoEnMoto 🏍`,
      meta: [
        {
          name: 'description',
          content:
            'AndoEnMoto is the webapp for upload your reviews for Motorcycle products. Helmets, Jackets, Bikes, etc.',
        },
        {
          property: 'og:title',
          content: 'AndoEnMoto',
        },
        { property: 'og:site_name', content: 'AndoEnMoto' },
        { property: 'og:type', content: 'website' },
        { name: 'robots', content: 'index,follow' },
      ],
    };
  },

  computed: {
    // brands() {
    //   return this.$store.state.brands.filterItems;
    // },
    // activeCategory() {
    //   return this.$store.state.categories.activeItem;
    // },
    selected() {
      return this.$route.params.brand;
    },

    ...mapState({
      activeBrand: (state) => state.brands.activeItem,

      activeStyle: (state) => state.styles.activeItem,

      brands: (state) => state.brands.filterItems,

      activeCategory: (state) => state.categories.activeItem,

      styles: (state) => state.styles.items,
    }),
  },
};
</script>

<style lang="scss" scoped>
.select-view {
  padding-top: 15%;
  @media screen and (min-width: 800px) {
    padding-top: 1.5%;
  }
}

.container-fluid {
  min-height: 100vh;
}

h2 {
  font-family: $typo;
}

h3 {
  font-family: $title;
}

.brands {
  background: white;
  transition: 1s ease-in;
  .category-badge {
    filter: invert(100%);
  }
  h2 {
    color: $alpha;
  }
  h3 {
    color: $alpha;
  }
}

.style {
  background: $main-gradient;
  transition: 1s ease-in;
  h2 {
    color: white;
  }
  h3 {
    color: white;
  }
}
</style>
