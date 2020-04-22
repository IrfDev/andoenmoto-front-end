<template>
  <button :class="{secondary:secondary,main:main}" class="mt-3">
      {{content}}
  </button>
</template>

<script>
export default {
  name: 'button',
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

<style lang='scss' scoped>
button{
font-family: Oswald;
font-size: 7vw;
padding: .3em 1.5em;
}
.secondary{
color: #FCAC00;
border: 3px solid #FCAC00;
border-radius: 4px;
background-color: transparent;
}
.main{
border:none;
background: #FCAC00;
border-radius: 4px;
color:$alpha;
}
</style>
