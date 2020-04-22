<template>
  <div :class="`col-${colWidth} flex-nowrap align-content-stretch`">
      <img :src="image" :alt="name" class="img-fluid">
      <h4 class="mt-2">{{name}}</h4>
  </div>
</template>

<script>
export default {
  name: 'CategoryBadge',
  props: {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    colWidth: {
      type: Number,
    },
  },
};
</script>

<style lang="scss" scoped>
h4{
  color:$alpha-white;
  font-family: $title;
  font-size:5vw;
}
</style>
