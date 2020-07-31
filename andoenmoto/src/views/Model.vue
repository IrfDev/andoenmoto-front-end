<template>
  <div v-if="asyncDataStatus_ready" class="models pb-3 pt-2 text-center">
    <thundie-row>
      <h1>{{ activeModel.name }}</h1>
    </thundie-row>
    <h2>By {{ activeBrand.name }}</h2>
    <h2 class="typo-font-size title mt-5 mb-5">Galery</h2>
    <horizontal-fotos :fotos="fotos" class="d-md-none" />
    <galery-photos :fotos="fotos" class="d-md-flex d-none" />

    <h3 class="typo-font-size title mt-5 mb-5">Posts</h3>

    <horizontal-posts :posts="posts" />
    <fixed-ctas />
    <post-form class="fade" />
  </div>
  <div class="models" v-else>
    <thundie-row>
      <div
        class="spinner-border text-light"
        style="width: 3rem; height: 3rem;"
        role="status"
      >
        <span class="sr-only"></span>
      </div>
    </thundie-row>
  </div>
</template>

<script>
import ReviewsStatsCard from '@/components/ui/ReviewsStatsCard.vue';

import FixedCtas from '@/components/utilities/FixedCtas.vue';
import HorizontalFotos from '@/components/sections/HorizontalFotos.vue';
import HorizontalPosts from '@/components/sections/HorizontalPosts.vue';
import GaleryPhotos from '@/components/sections/GaleryPhotos.vue';

import asyncDataStatus from '@/mixins/asyncDataStatus';
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  name: 'Model',
  components: {
    FixedCtas,
    HorizontalPosts,
    HorizontalFotos,
    GaleryPhotos,
    PostForm: () => import('@/components/ui/basics/PostForm.vue'),
  },

  methods: {
    ...mapActions({
      fetchAllPosts: 'posts/fetchAllPosts',

      findCategory: 'categories/findCategory',

      findAndActiveBrand: 'brands/findAndActiveBrand',

      findAndActiveModel: 'models/findAndActiveModel',

      fetchAllStyles: 'styles/fetchAllStyles',
    }),
  },

  async created() {
    await this.findAndActiveBrand(this.$route.params.brand);
    await this.findAndActiveModel(this.$route.params.model);

    this.fetchAllPosts();
    this.asyncDataStatus_fetched();
  },

  mixins: [asyncDataStatus],

  computed: {
    ...mapState({
      activeModel: (state) => state.models.activeItem,

      activeBrand: (state) => state.brands.activeItem,
    }),

    ...mapGetters({
      posts: 'posts/postsFromModel',

      fotos: 'posts/fotosFromPosts',
    }),
  },

  data() {
    return {
      bgImg: 'sporter',
      reviews: [
        {
          category: 'Comfort',
          pro: true,
          description:
            'The comfort of this product is nice but could be better',
        },
        {
          category: 'Size',
          pro: false,
          description: 'Carefull with the size!',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
h1 {
  font-family: $title;
  font-weight: normal;
  color: $alpha-white;
}

h2,
h3 {
  font-family: $typo;
  color: $alpha-white;
}

h3 {
  color: white;
}

.models::before {
  content: '';
  top: 0;
  position: relative;
  z-index: 100;
  height: 100vh;
  width: 100vw;
  background: $main-gradient !important;
}

.models {
  background-size: cover;
  min-height: 100vh;
  background-image: linear-gradient(232.8deg, #303030 0%, #1b1b1b 83.33%);
}
</style>
