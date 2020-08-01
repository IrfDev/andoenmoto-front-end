<template>
  <basic-button
    data-toggle="modal"
    :content="'Upload review'"
    :main="true"
    data-target="#exampleModal"
    class="modal-button-trrigger fixed-bottom-center fixed-cta align-self-center"
  />
</template>

<script>
export default {
  name: 'FixedCtas',
};
</script>

<style lang="scss" scoped>
.fixed-cta {
  z-index: 100;
}
</style>
