<template>
  <div
    class="GaleryPhoto row m-0 p-3 align-items-stretch justify-content-center"
  >
    <div v-for="(foto, fotoIndex) in fotos" :key="fotoIndex" class="col-5">
      <foto-card :urls="foto" />
    </div>
  </div>
</template>

<script>
import FotoCard from '@/components/ui/FotoCard.vue';

export default {
  name: 'GaleryPhotos',
  components: {
    FotoCard,
  },
  props: {
    fotos: {
      type: [Object, Array],
      required: true,
    },
  },
};
</script>

<style lang="scss">
.GaleryPhoto {
}
</style>
