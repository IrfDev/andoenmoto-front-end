<template>
  <div class="wingie d-flex justify-content-center align-items-center">
    <img src="/images/util/left-wing.png" alt="wing-row" class="img-fluid" />
    <div>
      <slot />
    </div>
    <img src="/images/util/right-wing.png" alt="wing-row" class="img-fluid" />
  </div>
</template>

<script>
export default {
  name: 'WingieRow',
};
</script>

<style lang="scss" scoped>
.wingie {
  z-index: 5;
}
img {
  margin: 0px 5px;
  width: 27%;
}
h1 {
  font-family: $typo;
  color: white;
}
@media (min-width: 800px) {
  img {
    margin: 0px 10px;
    width: 12%;
  }
}
</style>
