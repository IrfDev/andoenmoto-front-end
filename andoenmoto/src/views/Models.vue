<template>
  <div v-if="asyncDataStatus_ready" class="models">
    <div class="row m-0 models-view justify-content-center text-center flex-column">
      <wings-row>
        <h1>{{ activeCategory.name | translateName}}</h1>
      </wings-row>

      <h3>~{{ activeBrand.name }}</h3>

      <h4>{{ activeStyle.title }}</h4>
    </div>
    <div class="row m-0 justify-content-center align-items-stretch">
      <div
        v-for="(model, modelIndex) in models"
        :key="modelIndex"
        class="col-10 col-md-4 mt-3 text-center"
        @click="goToModel(model)"
      >
        <model-card :name="model.name" />
      </div>
    </div>
  </div>
  <div class="models" v-else>
    <wings-row>
      <div class="spinner-grow text-light" style="width: 3rem; height: 3rem;" role="status">
        <span class="sr-only"></span>
      </div>
    </wings-row>
  </div>
</template>

<script>
import ModelCard from '@/components/ui/ModelCard.vue';

import { mapActions, mapGetters, mapState } from 'vuex';

import asyncDataStatus from '@/mixins/asyncDataStatus';

export default {
  name: 'Models',
  components: {
    ModelCard,
  },

  mixins: [asyncDataStatus],

  async mounted() {
    await this.findCategory(this.$route.params.category);
    await this.findAndActiveBrand(this.$route.params.brand);
    await this.findAndActiveStyle(this.$route.params.style);
    await this.fetchAllModels();
    this.asyncDataStatus_fetched();
  },

  computed: {
    ...mapGetters({
      models: 'models/modelsFromBrandAndCategory',
    }),

    ...mapState({
      activeBrand: (state) => state.brands.activeItem,
      activeStyle: (state) => state.styles.activeItem,
      activeCategory: (state) => state.categories.activeItem,
    }),
  },

  metaInfo() {
    return {
      title: `${this.activeBrand.name || 'Cargando'} ${
        this.activeStyle.title || 'AndoEnMoto'
      }  | AndoEnMoto 🏍`,
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

  methods: {
    ...mapActions({
      fetchAllModels: 'models/fetchAllModels',

      findCategory: 'categories/findCategory',

      findAndActiveBrand: 'brands/findAndActiveBrand',

      findAndActiveStyle: 'styles/findAndActiveStyle',
    }),

    goToModel(model) {
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
};
</script>

<style lang="scss" scoped>
.models-view {
  padding-top: 15%;
  @media screen and (min-width: 800px) {
    padding-top: 5%;
  }
}

h1 {
  font-family: $typo;
  color: $alpha-white;
}
h3,
h4 {
  font-family: $title;
  color: $alpha-white;
}
.models {
  background: $main-gradient;
  min-height: 100vh;
}
</style>
