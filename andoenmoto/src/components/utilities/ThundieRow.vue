<template>
  <div class="thundie d-flex justify-content-center align-items-center">
    <img src="/images/util/left-thunder.png" alt="thunder-row" class="" />
    <div>
      <slot />
    </div>
    <img src="/images/util/right-thunder.png" alt="thunder-row" class="" />
  </div>
</template>

<script>
export default {
  name: 'ThundieRow',
};
</script>

<style lang="scss" scoped>
@media (min-width: 768px) {
  img {
    margin: 0px 0px;
    width: 10%;
  }
}
img {
  margin: 0px 0px;
}
h1 {
  font-family: $typo;
  color: white;
}
</style>
