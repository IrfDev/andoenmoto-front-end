<template>
  <div class="card">
    {{name}}
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

<style lang ='scss' scoped>

</style>
