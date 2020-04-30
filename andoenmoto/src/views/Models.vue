<template>
  <div class="models">
      <div class="row m-0 justify-content-center text-center flex-column">
        <h1>{{activeStyle.title}}</h1>
        <h2>{{activeBrand.name}}</h2>
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
</template>

<script>
import ModelCard from '@/components/ui/ModelCard.vue';

export default {
  name: 'Models',
  components: {
    ModelCard,
  },
  methods: {
    goToModel() {
      this.$router.push({
        name: 'categories-style-models-model',
      });
    },
  },
  beforeCreate() {
    this.$store.dispatch('fetchAllModels');
  },
  computed: {
    models() {
      return this.$store.getters.modelsFromBrandAndCategory;
    },
  },
  data() {
    return {
      activeBrand: this.$store.state.activeBrand,
      activeStyle: this.$store.state.activeStyle,
    };
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
}
</style>
