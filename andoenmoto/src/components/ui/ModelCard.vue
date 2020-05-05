<template>
  <div class="card">
    <h4>
      {{name}}
    </h4>
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

<style lang='scss' scoped>
h4{
  font-family: $paragraph;
  color: $alpha;
}
.card{
  box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.3);
}
</style>
