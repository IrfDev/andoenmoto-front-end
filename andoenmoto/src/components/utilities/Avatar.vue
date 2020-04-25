<template>
  <div class="rounded-circle overflow-hidden w-25">
      <img :src="`/images/brands/${image}.png`" :alt="image">
      <h4>{{user}}</h4>
  </div>
</template>

<script>
export default {
  name: 'Avatar',
  data() {
    return {
      image: 'hebotech',
      user: 'Jojo',
    };
  },
//   props: {
//     user:Object,
//   },
};
</script>

<style>

</style>
