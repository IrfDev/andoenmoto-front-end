<template>
<div class="card" style="width: 18rem;">
    <avatar
        :user="user"
    />
  <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="/bgs/sporter.png" class="d-block w-100" alt="/bgs/sporter.png">
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
</div>
</template>

<script>
import Avatar from '@/components/utilities/Avatar.vue';

export default {
  name: 'FotoCard',
  components: {
    Avatar,
  },
};
</script>

<style lang='scss' scoped>

</style>
