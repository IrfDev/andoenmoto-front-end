<template>
<div class="card post-card" style="width: 18rem;">
  <div class="card-header">
    {{post.title}}
  </div>
    <div
      class="card-body d-flex flex-column align-content-start"
    >
      <p>
        {{post.content}}
      </p>
    </div>
    <div class="card-footer d-flex">
      <avatar
        :widthPer="10"
        :userId="post.user"
        :auth="false"
        :displayName="true"
      />
    </div>
</div>
</template>

<script>
export default {
  name: 'PostCard',
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.post-card {
  background: linear-gradient(216.93deg, #28283E 0%, #181726 83.33%);
  color: white;
  .card-header{
    font-size: 6vw;
    font-family: $title;
  }
  .card-body{
    font-size:3vw;
    font-family: $paragraph;
  }
    i{
        font-size:.5em
    }
}
</style>
