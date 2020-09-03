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
  cursor: pointer;
  box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.3);
  height: 100%;
  transition: 0.3s ease-in-out;
  font-size: 100%;
  &:hover {
    transition: 0.3s ease-in-out;
    font-size: 105%;
  }
}
</style>
