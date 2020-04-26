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

import firebase from 'firebase';

export default {
  name: 'Categoriess',
  components: {
    CategoryBadge,
    Brands,
    Styles,
  },
  beforeCreate() {
    firebase.database().ref('styles').once('value', (snapshot) => {
      const styles = snapshot.val();

      this.$store.commit('SET_STYLES', styles);
    });

    firebase.database().ref('brands').once('value', (snapshot) => {
      const brands = snapshot.val();

      this.$store.commit('SET_BRANDS', brands);
    });

    this.$store.dispatch('findCategory', this.$route.params.category);
  },
  computed: {
    category() {
      return this.$store.state.activeCategory;
    },
    brands() {
      return this.$store.state.sourceData.brands;
    },
    styles() {
      return this.$store.state.sourceData.styles;
    },
  },
  data: () => ({
    categoryName: 'Motocicletas',
    categoryStyle: '',
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
