<template>
  <div class="card mt-3" :class="`${title}-background`">
      <h2>{{title}}</h2>
      <h4>{{description}}</h4>
      <img :src="`/images/styles/${title}.png`" width="130%" alt="">
      <div class="card-content">
        <basic-button
          :main="true"
          :content="'Ver más'"
        />
      </div>
  </div>
</template>

<script>

export default {
  name: 'StyleCard',
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang='scss' scoped>
.card{
    overflow:visible;
    background: $complementary-gradient;
    color:$alpha-white;
    box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.3);
    border-radius: 5px;
}
h2{
    font-family: $typo;
    font-size: 25vw;
}
h4{
    font-family:$title;
    // font-weight: $bolds;
}
img{
    position: relative;
    bottom:20vw;
    right:10vw;
}
</style>
