<template>
<div class="horizontal-posts mt-3 d-flex flex-row flex-nowrap overflow-auto">
  <div v-for="(post, postIndex) in posts" :key="postIndex">
    <post-card
      :post="post"
    />
  </div>
</div>
</template>

<script>
import PostCard from '@/components/ui/PostCard.vue';

export default {
  name: 'HorizontalPosts',
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
  components: {
    PostCard,
  },
};
</script>

<style lang="scss">

</style>
