<template>
  <div
    class="row horizontal-posts mt-3 m-0 justify-content-center flex-row flex-nowrap overflow-auto"
  >
    <div
      class="col-md-6 col-9"
      v-for="(post, postIndex) in posts"
      :key="postIndex"
    >
      <post-card :post="post" />
    </div>
  </div>
</template>

<script>
import PostCard from '@/components/ui/PostCard.vue';

export default {
  name: 'HorizontalPosts',
  props: {
    posts: {
      type: [Object, Array],
      required: true,
    },
  },
  components: {
    PostCard,
  },
};
</script>

<style lang="scss"></style>
