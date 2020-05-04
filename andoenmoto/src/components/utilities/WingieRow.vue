<template>
<div class="title d-flex justify-content-around align-items-center">
  <img src="/images/util/left-wing.png" alt="" class="">
  <slot class="col"></slot>
  <img src="/images/util/right-wing.png" alt="" class="">
</div>
</template>

<script>
export default {
  name: 'WingieRow',
};
</script>

<style lang='scss' scoped>
h1{
  font-family: $typo;
  color:white;
}
</style>
