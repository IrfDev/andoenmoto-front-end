<template>
<div class="title d-flex justify-content-around align-items-center">
  <img src="/images/util/left-lightie.png" alt="" class="img-fluid">
  <slot class="col"></slot>
  <img src="/images/util/right-lightie.png" alt="" class="img-fluid">
</div>
</template>

<script>
export default {
  name: 'LightieRow',
};
</script>

<style lang='scss' scoped>
h1{
  font-family: $typo;
  color:white;
}
</style>
