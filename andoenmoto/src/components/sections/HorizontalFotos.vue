<template>
  <div class="d-flex flex-row flex-nowrap overflow-auto">
    <div
      v-for="(foto, fotoIndex) in fotos"
      :key="fotoIndex"
      class="mr-3"
    >
        <foto-card
          :urls="foto"
        />
    </div>
  </div>
</template>

<script>
import FotoCard from '@/components/ui/FotoCard.vue';

export default {
  name: 'HorizontalFotos',
  props: {
    fotos: {
      type: [Object, Array],
      required: true,
    },
  },
  components: {
    FotoCard,
  },
};
</script>

<style>

</style>
