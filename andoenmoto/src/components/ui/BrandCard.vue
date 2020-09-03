<template>
  <div class="card">
    <div
      class="card-body d-flex align-items-center flex-row"
      data-toggle="tooltip"
      data-placement="top"
      :title="brand"
    >
      <img :src="`/images/brands/${brand}.png`" :alt="brand" class="img-fluid" />
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
  cursor: pointer;
  box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.3);
  height: 7em;
  img {
    transition: all 0.3s ease-out;
    margin: 0 auto;
    max-height: 5em;
  }
  &:hover {
    img {
      transition: all 0.2s ease-in;
      max-height: 5.5em;
    }
  }
}
</style>
