<template>
<div :class="`card text-white bg-${color} mb-3`">
    <div class="card-header">
        {{category}}
    </div>
    <div class="card-body">
    <p class="card-text">
        {{description}}
    </p>
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
    color: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang='scss' scoped>

</style>
