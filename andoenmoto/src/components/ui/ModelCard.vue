<template>
  <div class="card">
    <h4 class="m-3">{{ name }}</h4>
  </div>
</template>

<script>
export default {
  name: 'ModelCard',
  props: {
    name: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
h4 {
  font-family: $title;
  color: $alpha;
}
.card {
  box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.3);
  height: 100%;
}
</style>
