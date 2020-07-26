<template>
  <div class="card text-white mb-3" :class="[pro ? 'pro' : 'cons']">
    <div class="card-header">{{category}}</div>
    <div class="card-body">
      <p class="card-text">{{description}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReviewStatsCard',
  props: {
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    pro: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style lang='scss' scoped>
.pro {
  background-color: #235c3d;
}

.cons {
  background-color: #5c2323;
}
</style>
