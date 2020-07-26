<template>
  <div class="row m-0 justify-content-center justify-content-md-around">
    <div
      class="col-10 col-md-5 align-items-stretch"
      v-for="(style, styleIndex) in styles"
      :key="styleIndex"
      @click="styleSelected(style)"
    >
      <style-card v-bind="style" />
    </div>
  </div>
</template>

<script>
import StyleCard from '@/components/ui/StyleCard.vue';

export default {
  name: 'Styles',
  components: {
    StyleCard,
  },

  props: {
    styles: {
      type: Object,
      required: true,
    },
  },

  methods: {
    styleSelected(style) {
      this.$store.commit('styles/SET_ACTIVE_STYLE', style);
      if (this.$route.name === 'categories-style') {
        this.$router.push({
          name: 'category-brands',
          params: {
            style: style.title,
          },
        });
      } else {
        this.$router.push({
          name: 'categories-style-models',
          params: {
            style: style.title,
            category: this.$route.params.category,
            brand: this.$route.params.brand,
          },
        });
      }
    },
  },
};
</script>
