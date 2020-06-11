<template>
<div
  class="card post-card"
  :style="`background: ${bgColor}`"
>
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
      <router-link
        :to="{ name: 'profile-page-nam', params: { profileId: post.user }}"
      >
        <avatar
          :widthPer="10"
          :userId="post.user"
          :auth="false"
          :displayName="true"
        />
      </router-link>
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
  data() {
    return {
      backgroundsGradients: [
        'linear-gradient(216.93deg, #353E28 0%, #202617 83.33%);',
        'linear-gradient(216.93deg, #303030 0%, #1B1B1B 83.33%);',
        'linear-gradient(216.93deg, #3E2828 0%, #261717 83.33%);',
        'linear-gradient(216.93deg, #282E3E 0%, #171C26 83.33%);',
        'linear-gradient(216.93deg, #3E3C28 0%, #262617 83.33%);',
        'linear-gradient(216.93deg, #28283E 0%, #181726 83.33%);',
        'linear-gradient(216.93deg, #592323 0%, #432424 83.33%);',
        'linear-gradient(216.93deg, #585923 0%, #424324 83.33%);',
      ],
    };
  },
  computed: {
    bgColor() {
      const randomNumber = Math.random() * this.backgroundsGradients.length;
      return this.backgroundsGradients[Math.round(randomNumber) - 1];
    },
  },
};
</script>

<style lang="scss" scoped>
.post-card {
  color: white;
  .card-header{
    font-size: 6vw;
    font-family: $title;
  }
  .card-footer{
    padding: 0.25rem 0.25rem;
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
