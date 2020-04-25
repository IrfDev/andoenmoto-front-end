<template>
  <div
    class="
      row align-content-center
      align-center
      justify-content-center
      justify-content-md-around
      "
  >
    <div class="col-10 col-md-5" v-for="(style, styleIndex) in styles" :key="styleIndex">
      <style-card
        v-bind="style"
      />
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
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang='scss' scoped>

</style>
