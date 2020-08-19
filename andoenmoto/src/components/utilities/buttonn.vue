<template>
  <button
    :class="{ secondary: secondary, main: main, isModal: isModal }"
    class="mt-3"
  >
    {{ content }}
  </button>
</template>

<script>
export default {
  name: 'buttonn',
  props: {
    content: {
      type: String,
      required: true,
    },
    secondary: Boolean,
    main: Boolean,
    isModal: Boolean,
  },
};
</script>

<style lang="scss" scoped>
button {
  font-family: Oswald;
  padding: 0.3em 1.5em;
}
.secondary {
  color: #fcac00;
  border: 3px solid #fcac00;
  border-radius: 4px;
  background-color: transparent;
}
.main {
  border: none;
  background: #fcac00;
  border-radius: 4px;
  color: $alpha;
}

.isModal {
  font-size: 1em;
  @media screen and(min-width:800px) {
    font-size: 1.5em;
  }
}
</style>
