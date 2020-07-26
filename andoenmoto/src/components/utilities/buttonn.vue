<template>
  <button :class="{ secondary: secondary, main: main }" class="mt-3">
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
</style>
