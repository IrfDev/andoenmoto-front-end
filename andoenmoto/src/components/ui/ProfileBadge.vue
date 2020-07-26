<template>
  <div class="profile-badge col-12 mt-4">
    <img
        :src="`/images/profile-badges/${titleBadge}.png`"
        :alt="titleBadge"
        class="img-fluid"
    >
    <h5 class="mt-2">
        {{titleBadge}}
    </h5>
  </div>
</template>

<script>
export default {
  name: 'ProfileBadge',
  props: {
    titleBadge: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss">
h5 {
    font-family: $subtitle;
    color: $alpha-white;

}
</style>
