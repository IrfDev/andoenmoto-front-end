<template>
  <div class="card">
    <div class="card-body d-flex align-items-center flex-row">
      <img
        :src="`/images/brands/${brand}.png`"
        :alt="brand"
        class="img-fluid"
      />
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
  data() {
    return {
      validUrl: true,
    };
  },
};
</script>

<style lang="scss" scoped>
.card {
  box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.3);
  height: 100%;
  img {
    margin: 0 auto;
    max-height: 5em;
  }
}
</style>
