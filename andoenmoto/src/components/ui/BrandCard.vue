<template>
<div class="card" style="width: 18rem;">
  <div class="card-body">
    <img
        :src="`/images/brands/${brand}.png`"
        :alt="brand"
        class="img-fluid"
    >
  </div>
</div>
</template>

<script>
export default {
  name: 'BrandCard',
  props: {
    brand: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.card{
  box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.3);
}
</style>
