<template>
  <div
    class="container-fluid categories-view"
    id="categories-view"
    :class="{ style: categoryStyle, category: !categoryStyle }"
  >
    <div v-if="asyncDataStatus_ready" class="category-content pb-5">
      <div class="row justify-content-center text-center">
        <div class="col-12 justify-content-center align-items-center d-flex flex-column">
          <img src="/identity/stars.png" class="img-fluid stars-img m-0" alt="AndoEnMoto-stars" />
          <category-badge
            :colWidth="category.colWidth"
            :image="category.image"
            :name="category.name"
            class="category-badge mt-0"
            :reverse="true"
          />
        </div>
        <toggle-button
          v-model="categoryStyle"
          :font-size="15"
          :margin="5"
          :height="40"
          :width="180"
          :value="false"
          class="mt-4"
          :color="{ checked: '#303030', unchecked: '#353E28' }"
          :sync="false"
          :labels="{ checked: 'Styles', unchecked: 'Brands' }"
        />
      </div>
      <styles v-if="!categoryStyle" :styles="styless" />
      <brands v-else :brands="brands" />
    </div>
    <div v-else class="container-fluid text-center loader">
      <div>
        <img src="/identity/stars.png" class="img-fluid m-0" alt="AndoEnMoto-stars" />
      </div>
      <h2>{{ this.$route.params.category }}</h2>

      <div class="spinner-border color-light" style="width: 3rem; height: 3rem;" role="status">
        <span class="sr-only"></span>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryBadge from '@/components/ui/basics/CategoryBadge.vue';
import Styles from '@/components/sections/selection/Styles.vue';
import Brands from '@/components/sections/selection/Brands.vue';

import { mapActions, mapState } from 'vuex';
import asyncDataStatus from '@/mixins/asyncDataStatus';

import { gsap, TweenMax } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';
gsap.registerPlugin(ScrollTrigger);

export default {
  name: 'Categoriess',
  components: {
    CategoryBadge,
    Brands,
    Styles,
  },

  mixins: [asyncDataStatus],

  methods: {
    startAnimation() {
      () => {
        TweenMax.from('#categories-view', {
          duration: 0.5,
          opacity: 0,
          scale: 0.1,
          filter: 'blur(7px)',
          y: 100,
          ease: 'power1',
          stagger: {
            each: 0.1,
            from: 'top',
          },
        });
      };
      a();
    },

    ...mapActions({
      findCategory: 'categories/findCategory',
      fetchBrands: 'brands/fetchBrands',
      fetchStyles: 'styles/fetchStyles',
    }),
  },

  async beforeMount() {
    await this.findCategory(this.$route.params.category);
    await this.fetchBrands(
      Object.keys(this.$store.state.categories.activeItem.brands)
    );
    await this.fetchStyles(
      Object.keys(this.$store.state.categories.activeItem.styles)
    );

    this.asyncDataStatus_fetched();
  },

  metaInfo() {
    return {
      title: `${this.category.name} category | AndoEnMoto 🏍`,
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

  computed: {
    ...mapState({
      category: (state) => state.categories.activeItem,

      brands: (state) => state.brands.items,

      styless: (state) => state.styles.items,
    }),
  },
  data() {
    return {
      categoryStyle: true,
    };
  },
};
</script>

<style lang="scss" scoped>
.categories-view {
  padding-top: 18%;
  @media screen and (min-width: 800px) {
    padding-top: 5%;
  }
}

.category {
  background-color: white;
  transition: all 2s ease-in;
  .category-badge {
    transition: all 0.6s ease-in;
    filter: invert(100%);
  }
}
.style {
  background: $main-gradient;
  transition: all 2s ease-in;
  .category-badge {
    transition: all 0.6s ease-in;
  }
}
.loader {
  font-family: $typo;
  color: $alpha-white;
}
.container-fluid {
  min-height: 100vh !important;
  .color-light {
    align-self: center;
    color: #eee;
  }
}
</style>
