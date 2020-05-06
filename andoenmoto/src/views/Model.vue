<template>
  <div
    v-if="asyncDataStatus_ready"
    class="models pb-3"
    :style="`
        background-size:cover;
        background-image:url('/bgs/${bgImg}.png');
        background-image:linear-gradient(232.8deg, #303030 0%, #1B1B1B 83.33%);
    `"
    >
      <h1>{{activeModel.name}}</h1>
      <h2>by {{activeBrand.name}}</h2>
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
      <horizontal-fotos
        :fotos="fotos"
      />
      <horizontal-posts
        :posts="posts"
      />
      <fixed-ctas/>
  </div>
  <div v-else class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
    <span class="sr-only"></span>
  </div>
</template>

<script>
import ReviewsStatsCard from '@/components/ui/ReviewsStatsCard.vue';
import FixedCtas from '@/components/utilities/FixedCtas.vue';
import HorizontalFotos from '@/components/sections/HorizontalFotos.vue';
import HorizontalPosts from '@/components/sections/HorizontalPosts.vue';

import asyncDataStatus from '@/mixins/asyncDataStatus';
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  name: 'Model',
  components: {
    ReviewsStatsCard,
    FixedCtas,
    HorizontalPosts,
    HorizontalFotos,
  },
  async created() {
    await this.fetchAllBrands();
    await this.findAndActiveBrand(this.$route.params.brand);
    await this.fetchAllModels();
    await this.findAndActiveModel(this.$route.params.model);
    this.fetchAllPosts();
    this.asyncDataStatus_fetched();
  },
  mixins: [asyncDataStatus],
  methods: {
    ...mapActions({
      fetchAllPosts: 'posts/fetchAllPosts',
      fetchAllModels: 'models/fetchAllModels',
      findCategory: 'categories/findCategory',
      fetchAllCategories: 'categories/fetchAllCategories',
      fetchAllBrands: 'brands/fetchAllBrands',
      findAndActiveBrand: 'brands/findAndActiveBrand',
      findAndActiveStyle: 'styles/findAndActiveStyle',
      findAndActiveModel: 'models/findAndActiveModel',
      fetchAllStyles: 'styles/fetchAllStyles',
    }),
  },
  computed: {
    ...mapState({
      activeModel: (state) => state.models.activeItem,
      activeBrand: (state) => state.brands.activeItem,
    }),
    ...mapGetters({
      posts: 'posts/postsFromModel',
      fotos: 'posts/fotosFromPosts',
    }),
    // posts() { return this.postsFromModel(); },
    // fotos() { return this.fotosFromPosts(); },
  },
  data() {
    return {
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
