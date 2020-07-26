<template>
  <div class="card">
    <div
      id="carouselExampleControls"
      class="carousel slide"
      data-ride="carousel"
    >
      <div class="carousel-inner">
        <div
          v-for="(url, urlIndex) in urls"
          :key="urlIndex"
          class="carousel-item active"
        >
          <img :src="url" class="d-block img-fluid" alt="/bgs/sporter.png" />
        </div>
      </div>
      <a
        class="carousel-control-prev"
        href="#carouselExampleControls"
        role="button"
        data-slide="prev"
        v-if="urls.length > 1"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a
        class="carousel-control-next"
        href="#carouselExampleControls"
        role="button"
        v-if="urls.length > 1"
        data-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FotoCard',
  props: {
    urls: Array,
  },
};
</script>

<style lang="scss" scoped>
.card {
  border: none;
  border-radius: 5px;
  box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.1);
}
</style>
