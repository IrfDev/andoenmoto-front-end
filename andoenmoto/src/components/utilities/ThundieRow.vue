<template>
<div class="title d-flex justify-content-around align-items-center">
  <img src="/images/util/left-thunder.png" alt="" class="">
  <slot class="col"></slot>
  <img src="/images/util/right-thunder.png" alt="" class="">
</div>
</template>

<script>
export default {
  name: 'ThundieRow',
};
</script>

<style lang='scss' scoped>
h1{
  font-family: $typo;
  color:white;
}
</style>
