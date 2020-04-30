<template>
  <div class="container-fluid" :class="{style:categoryStyle, category: !categoryStyle}">
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
      <styles v-if="!categoryStyle" :styles="styles"/>
      <brands v-else :brands="brands"/>
  </div>
</template>

<script>
import CategoryBadge from '@/components/ui/basics/CategoryBadge.vue';
import Styles from '@/components/sections/selection/Styles.vue';
import Brands from '@/components/sections/selection/Brands.vue';

export default {
  name: 'Categoriess',
  components: {
    CategoryBadge,
    Brands,
    Styles,
  },
  async beforeCreate() {
    await this.$store.dispatch('fetchAllCategories');
    await this.$store.dispatch('findCategory', this.$route.params.category);
    this.$store.dispatch('fetchBrands', Object.keys(this.$store.state.activeCategory.brands));
    this.$store.dispatch('fetchStyles', Object.keys(this.$store.state.activeCategory.styles));
  },
  computed: {
    category() {
      return this.$store.state.activeCategory;
    },
    brands() {
      return this.$store.state.brands;
    },
    styles() {
      return this.$store.state.styles;
    },
  },
  data: () => ({
    categoryName: 'Motocicletas',
    categoryStyle: false,
  }),
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
