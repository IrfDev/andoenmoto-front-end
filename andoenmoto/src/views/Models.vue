<template>
  <div class="models">
      <div class="row m-0 justify-content-center text-center flex-column">
        <h1>{{activeStyle}}</h1>
        <h2>{{activeBrand}}</h2>
      </div>
      <div class="row m-0 justify-content-center">
          <div v-for="(model, modelIndex) in models" :key="modelIndex" class="col-10 mt-3">
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
  data() {
    return {
      activeBrand: 'Shaft',
      activeStyle: 'Enduro',
      models: [
        {
          name: 'Sh-520',
        },
        {
          name: 'Sh-520',
        },
        {
          name: 'Sh-520',
        },
        {
          name: 'Sh-520',
        },
        {
          name: 'Sh-520',
        },
        {
          name: 'Sh-520',
        },
      ],
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
