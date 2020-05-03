<template>
  <div v-if="asyncDataStatus_ready"
    class="container-fluid"
    :class="{style:categoryStyle, category: !categoryStyle}"
  >
      <div class="row justify-content-center">
          <div class="col-12">
            <img src="/identity/stars.png" class="img-fluid" alt="Ando En Moto">
          </div>
          <div class="col-12">
            <category-badge
              :colWidth="category.colWidth"
              :image="category.image"
              :name="category.name"
              class="category-badge"
            />
          </div>
          <!-- <toggle-button @change="..."/> -->
          <toggle-button
            v-model="categoryStyle"
            :font-size="15"
            :margin="5"
            :height="25"
            :width="150"
            :value="false"
            :color="{ checked:'#303030' , unchecked:'#353E28'}"
            :sync="false"
            :labels="{checked: 'Ver estílos', unchecked: 'Ver marcas'}"
          />
      </div>
      <styles v-if="!categoryStyle" :styles="styless"/>
      <brands v-else :brands="brands"/>
  </div>
  <div v-else class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
    <span class="sr-only"></span>
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
      fetchAllCategories: 'categories/fetchAllCategories',
      fetchBrands: 'brands/fetchBrands',
      fetchStyles: 'styles/fetchStyles',
    }),
  },
  async created() {
    await this.fetchAllCategories();
    await this.findCategory(this.$route.params.category);
    await this.fetchStyles(Object.keys(this.$store.state.categories.activeItem.styles));
    await this.fetchBrands(Object.keys(this.$store.state.categories.activeItem.brands));
    this.asyncDataStatus_fetched();
    console.log(this.styles);
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
      categoryStyle: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.category{
    background:white;
    transition:1s ease-in;
    .category-badge{
      filter: invert(100%);
    }

}
.style{
    background:$main-gradient;
    transition:1s ease-in;
}
</style>
