<template>
<div
  v-if="asyncDataStatus_ready"
  class="container-fluid"
  :class="{style: !selected, brands: selected}">
  <lightie-row>
    <h1>
      {{!selected ? activeStyle.title : activeBrand.name}}
    </h1>
  </lightie-row>
    <h2 class="mt-3">
      {{activeCategory.name}}
    </h2>
    <brands
      :brands="brands"
      v-if="!selected"
    />
    <styles
      :styles="styles"
      v-else
    />
</div>
<div v-else class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
  <span class="sr-only"></span>
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
      fetchAllStyles: 'styles/fetchAllStyles',
      fetchAllBrands: 'brands/fetchAllBrands',
      findCategory: 'categories/findCategory',
      fetchAllCategories: 'categories/fetchAllCategories',
      findAndActiveBrand: 'brands/findAndActiveBrand',
      findAndActiveStyle: 'styles/findAndActiveStyle',
    }),
    ...mapGetters({
      brandsFromActiveStyleId: 'brands/brandsFromActiveStyleId',
    }),
  },
  async created() {
    await this.fetchAllCategories();
    await this.findCategory(this.$route.params.category);
    if (this.$route.params.brand) {
      await this.fetchAllBrands();
      await this.findAndActiveBrand(this.$route.params.brand);
      this.fetchStyles(Object.keys(this.$store.state.brands.activeItem.styles));
      this.activeBrand = this.$store.state.brands.activeItem;
    } else {
      await this.fetchAllBrands();
      await this.fetchAllStyles();
      await this.findAndActiveStyle(this.$route.params.style);
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
    activeCategory() {
      return this.$store.state.categories.activeItem;
    },
    selected() {
      return this.$route.params.brand;
    },
    brands() {
      return Object.assign(this.brandsFromActiveStyleId());
    },
    styles() {
      return this.$store.state.styles.items;
    },
  },
};
</script>

<style lang='scss' scoped>
h1{
font-size:25vw;
font-family: $typo;
}
h2{
font-size:7vw;
font-family: $title;
}
.brands{
    background:white;
    transition:1s ease-in;
    .category-badge{
      filter: invert(100%);
    }
    h1{
      color:$alpha
    }
    h2{
      color:$alpha
    }

}
.style{
  background:$main-gradient;
  transition:1s ease-in;
  h1{
    color:$alpha;
  }
  h2{
    color:white;
  }
}
</style>
