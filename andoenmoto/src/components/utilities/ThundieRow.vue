<template>
  <div class="thundie d-flex justify-content-center align-items-center">
    <img
      src="/images/util/left-thunder.png"
      alt="thunder-row"
      class="img-fluid"
    />
    <div>
      <slot />
    </div>
    <img
      src="/images/util/right-thunder.png"
      alt="thunder-row"
      class="img-fluid"
    />
  </div>
</template>

<script>
export default {
  name: 'ThundieRow',
};
</script>

<style lang="scss" scoped>
img {
  margin: 0px 0px;
  width: 27%;
}
h1 {
  font-family: $typo;
  color: white;
}

@media (min-width: 800px) {
  img {
    margin: 0px 0px;
    width: 10%;
  }
}
</style>
