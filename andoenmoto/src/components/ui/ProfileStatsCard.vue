<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{ statText }}</h5>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileStatsCard',
  props: {
    statText: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.card {
  h5 {
    font-family: $title;
    color: $alpha;
  }
}
</style>
