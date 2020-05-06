<template>
  <div v-if="asyncDataStatus_ready" class="models">
      <div class="row m-0 justify-content-center text-center flex-column">
        <h1>{{activeStyle.title}}</h1>
        <wings-row>
          <h2>{{activeBrand.name}}</h2>
        </wings-row>
      </div>
      <div class="row m-0 justify-content-center">
          <div
            v-for="(model, modelIndex) in models"
            :key="modelIndex"
            class="col-10 mt-3"
            @click="goToModel(model)"
          >
            <model-card
              :name="model.name"
            />
          </div>
      </div>
  </div>
  <div v-else class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
    <span class="sr-only"></span>
  </div>
</template>

<script>
import ModelCard from '@/components/ui/ModelCard.vue';

import {
  mapActions, mapGetters, mapState,
} from 'vuex';

import asyncDataStatus from '@/mixins/asyncDataStatus';

export default {
  name: 'Models',
  components: {
    ModelCard,
  },
  mixins: [asyncDataStatus],
  methods: {
    ...mapGetters({
      modelsFromBrandAndCategory: 'models/modelsFromBrandAndCategory',
    }),
    ...mapActions({
      fetchAllModels: 'models/fetchAllModels',
      findCategory: 'categories/findCategory',
      fetchAllCategories: 'categories/fetchAllCategories',
      fetchAllBrands: 'brands/fetchAllBrands',
      findAndActiveBrand: 'brands/findAndActiveBrand',
      findAndActiveStyle: 'styles/findAndActiveStyle',
      fetchAllStyles: 'styles/fetchAllStyles',
    }),
    goToModel(model) {
      console.log(model);
      this.$store.commit('models/SET_ACTIVE_MODEL', model);
      this.$router.push({
        name: 'categories-style-models-model',
        params: {
          category: this.$store.state.categories.activeItem.name,
          brand: this.activeBrand.name,
          style: this.activeStyle.title,
          model: model.name,
        },
      });
    },
  },
  async created() {
    await this.fetchAllCategories();
    await this.findCategory(this.$route.params.category);
    await this.fetchAllBrands();
    await this.findAndActiveBrand(this.$route.params.brand);
    await this.fetchAllStyles();
    await this.findAndActiveStyle(this.$route.params.style);
    await this.fetchAllModels();
    this.asyncDataStatus_fetched();
  },
  computed: {
    models() {
      return this.modelsFromBrandAndCategory();
    },
    ...mapState({
      activeBrand: (state) => state.brands.activeItem,
      activeStyle: (state) => state.styles.activeItem,
    }),
  },
};
</script>

<style lang='scss' scoped>
h1{
    font-family:$typo;
    color:$alpha-white;
    font-size: 30vw;
}
h2{
    font-family:$title;
    color:$alpha-white;
    font-size: 10vw;
}
.models{
  background:$main-gradient;
  min-height: 100vh;
}
</style>
