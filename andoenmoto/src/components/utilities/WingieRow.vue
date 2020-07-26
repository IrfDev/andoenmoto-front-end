<template>
  <div class="wingie d-flex justify-content-center align-items-center">
    <img src="/images/util/left-wing.png" alt="wing-row" class="img-fluid" />
    <div>
      <slot />
    </div>
    <img src="/images/util/right-wing.png" alt="wing-row" />
  </div>
</template>

<script>
export default {
  name: 'WingieRow',
};
</script>

<style lang="scss" scoped>
@media (min-width: 768px) {
  img {
    margin: 0px 10px;
    width: 12%;
  }
}
img {
  margin: 0px 5px;
}
h1 {
  font-family: $typo;
  color: white;
}
</style>
