<template>
<div class="card" style="width: 18rem;">
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
    <div class="card-body d-flex flex-column align-content-start">
        <i class="fa fa-life-ring" aria-hidden="true"></i>
        <i class="fa fa-usd" aria-hidden="true"></i>
        <i class="fa fa-pie-chart" aria-hidden="true"></i>
        <i class="fa fa-pied-piper" aria-hidden="true"></i>
        <i class="fa fa-plug" aria-hidden="true"></i>
    </div>
    <div class="card-footer">
        <avatar/>
    </div>
</div>
</template>

<script>
export default {
  name: 'PostCard',
  data: () => ({
    user: 'Holo',
  }),
};
</script>

<style lang="scss">
.post-card {
    i{
        font-size:.5em
    }
}
</style>
