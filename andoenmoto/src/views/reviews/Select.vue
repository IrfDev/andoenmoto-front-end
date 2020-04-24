<template>
<div>
    <brands v-if="selected"/>
    <styles v-else/>
</div>
</template>

<script>
import Styles from '@/components/sections/selection/Styles.vue';
import Brands from '@/components/sections/selection/Brands.vue';

export default {
  name: 'Select',
  computed: {
    selected() {
      return this.$router.params.selected 
    },
  },
};
</script>

<style>

</style>