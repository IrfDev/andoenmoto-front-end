<template>
  <div
    class="models pb-3"
    :style="`
        background-size:cover;
        background-image:url('/bgs/${bgImg}.png');
        background-image:linear-gradient(232.8deg, #303030 0%, #1B1B1B 83.33%);
    `"
    >
      <h1>{{activeModel}}</h1>
      <h2>{{activeModel}} by {{activeBrand}}</h2>
      <div class="row m-0 justify-content-center">
          <div
            v-for="(review, reviewIndex) in reviews"
            :key="reviewIndex"
            class="col-12"
            >
            <reviews-stats-card
                :color="review.color"
                :category="review.category"
                :description="review.description"
            />
          </div>
          <h3>Ver más</h3>
      </div>
      <horizontal-fotos/>
      <horizontal-posts/>
      <fixed-ctas/>
  </div>
</template>

<script>
import ReviewsStatsCard from '@/components/ui/ReviewsStatsCard.vue';
import FixedCtas from '@/components/utilities/FixedCtas.vue';
import HorizontalFotos from '@/components/sections/HorizontalFotos.vue';
import HorizontalPosts from '@/components/sections/HorizontalPosts.vue';

export default {
  name: 'Model',
  components: {
    ReviewsStatsCard,
    FixedCtas,
    HorizontalPosts,
    HorizontalFotos,
  },
  // beforeCreate() {
  //   this.$store.dispatch('displayModel', this.route.params.model);
  // },
  data() {
    return {
      activeModel: 'SH-520',
      activeBrand: 'Shaft',
      bgImg: 'sporter',
      reviews: [
        {
          category: 'Comidad',
          color: 'danger',
          description: 'GGG',
        },
        {
          category: 'Comidad',
          color: 'primary',
          description: 'GGG',
        },
        {
          category: 'Comidad',
          color: 'danger',
          description: 'GGG',
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
h3{
    color:white;
}
.models::before{
    content:'';
    top:0;
    position: relative;
    z-index: 100;
    height:100vh;
    width:100vw;
    background:$main-gradient!important;
}
</style>
