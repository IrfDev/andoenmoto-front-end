<template>
  <div class="container-fluid home justify-content-center align-items-center">
    <Header class="pb-3" @clickReviews="scrollToCategories" />
    <div class="row m-0 justify-content-around badges-row m-auto" id="badges-features">
      <div class="col-12">
        <h2 class="title-section">Start now</h2>
      </div>
      <div class="col-lg-3 col-4 in-edge">
        <img src="/home/easy.png" alt="Easy" class="img-fluid" />
        <p>Easy to use</p>
      </div>
      <div class="col-lg-3 col-4">
        <img src="/home/smart.png" alt="Smart" class="img-fluid" />
        <p>Find reviews</p>
      </div>
      <div class="col-lg-3 col-4 in-edge">
        <img src="/home/help.png" alt="Help" class="img-fluid" />
        <p>Smart shopping</p>
      </div>
    </div>
    <categories v-if="asyncDataStatus_ready" />
    <div v-else class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
      <span class="sr-only"></span>
    </div>
  </div>
</template>

<script>
import Header from '@/components/sections/Header.vue';
import Categories from '@/components/sections/Categories.vue';

import { mapActions } from 'vuex';

import asyncDataStatus from '@/mixins/asyncDataStatus';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';
gsap.registerPlugin(ScrollTrigger);

export default {
  name: 'Home',

  components: {
    Header,
    Categories,
  },

  methods: {
    startAnimation() {
      const badgesTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#badges-features',
          start: 'top 90%',
          end: 'bottom center',
          scrub: true,
        },
      });

      badgesTl.addLabel('Badges').fromTo(
        '#badges-features .in-edge',
        {
          transform: 'translateY(5em)',
        },
        {
          transform: 'translateY(0)',
        }
      );
    },

    scrollToCategories() {
      let el = this.$el.getElementsByClassName('categories-home')[0];

      el.scrollIntoView({ behavior: 'smooth' });
    },

    ...mapActions({
      fetchAllCategories: 'categories/fetchAllCategories',

      authRedirectResponse: 'auth/authRedirectResponse',
    }),
  },

  mixins: [asyncDataStatus],

  mounted() {
    this.startAnimation();
  },

  async created() {
    await this.fetchAllCategories();
    this.asyncDataStatus_fetched();
  },

  metaInfo() {
    return {
      title: 'Home | AndoEnMoto 🏍',
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
};
</script>

<style lang="scss" scoped>
.badges-row {
  @media screen and (min-width: 800px) {
    padding: 5% 15%;
  }
  .title-section {
    font-family: $typo;
    color: $alpha-white;
  }
  img {
    max-height: 2em;
    @media screen and (min-width: 800px) {
      max-height: 6em;
    }
  }
  text-align: center;
  p {
    font-family: $title;
    color: $alpha-white;
  }
}
.home {
  min-height: 100vh;
  padding-top: 15%;

  @media screen and (min-width: 800px) {
    padding-top: 05%;
  }
}
* {
  background: $alpha;
}
</style>
