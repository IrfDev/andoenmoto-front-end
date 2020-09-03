<template>
  <div
    class="card mt-3 text-center d-flex flex-column justify-content-around"
    :class="`${title}-background`"
  >
    <h3 class="typo-font-size">{{ title }}</h3>
    <p>{{ description }}</p>
    <img :src="`/images/styles/${title}.png`" :alt="title" />
    <div class="card-content mb-3">
      <basic-button :main="true" :content="'See more'" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'StyleCard',

  inLowerCase(text) {
    return text.toLowerCase();
  },

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

<style lang="scss" scoped>
.card {
  overflow: visible;
  background: $complementary-gradient;
  color: $alpha-white;
  box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  height: 100%;
  transition: 0.3s ease-in-out;
  img {
    transition: 0.3s ease-in-out;
    width: 120%;
  }
  &:hover {
    box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.561);
    transition: all 0.3s ease-in-out;
    img {
      transition: all 0.3s ease-in-out;
      transform: translateY(0.5em);
    }
  }
}

h3 {
  font-family: $typo;
}

p {
  font-family: $title;
  font-weight: 400;
  margin: 1.5em;

  @media screen and (min-width: 800px) {
    margin: 0 1.5em;
  }
}
img {
  position: relative;
  right: 2vw;
}
</style>
