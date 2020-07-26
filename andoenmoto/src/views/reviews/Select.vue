<template>
  <div
    v-if="asyncDataStatus_ready"
    class="container-fluid text-center"
    :class="{ style: !selected, brands: selected }"
  >
    <div class="row m-0">
      <div class="col-12">
        <wings-row>
          <h1 class="typo-font-size title wingie">
            {{ !selected ? activeStyle.title : activeBrand.name }}
          </h1>
        </wings-row>
        <h2 class="mt-1">{{ activeCategory.name }}</h2>
      </div>
    </div>
    <brands :brands="brands" v-if="!selected" />
    <styles :styles="styles" v-else />
  </div>
  <div v-else class="container-fluid style">
    <wings-row>
      <div
        class="spinner-border text-light"
        style="width: 3rem; height: 3rem;"
        role="status"
      >
        <span class="sr-only"></span>
      </div>
    </wings-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
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

      await this.fetchStyles(
        Object.keys(this.$store.state.brands.activeItem.styles),
      );

      this.activeBrand = this.$store.state.brands.activeItem;
    } else {
      await this.findAndActiveStyle(this.$route.params.style);
      /* This dispatch only works for this view. 
      Because use the activeItem state from Categories and Styles */
      await this.fetchCategoryStyleBrands();

      this.activeStyle = this.$store.state.styles.activeItem;
    }

    this.asyncDataStatus_fetched();
  },

  data() {
    return {
      activeStyle: {},
      activeBrand: {},
    };
  },

  computed: {
    brands() {
      return this.$store.state.brands.filterItems;
    },
    activeCategory() {
      return this.$store.state.categories.activeItem;
    },
    selected() {
      return this.$route.params.brand;
    },
    styles() {
      return this.$store.state.styles.items;
    },
  },
};
</script>

<style lang="scss" scoped>
.container-fluid {
  min-height: 100vh;
}

h1 {
  font-family: $typo;
}

h2 {
  font-family: $title;
}

.brands {
  background: white;
  transition: 1s ease-in;
  .category-badge {
    filter: invert(100%);
  }
  h1 {
    color: $alpha;
  }
  h2 {
    color: $alpha;
  }
}

.style {
  background: $main-gradient;
  transition: 1s ease-in;
  h1 {
    color: white;
  }
  h2 {
    color: white;
  }
}
</style>
