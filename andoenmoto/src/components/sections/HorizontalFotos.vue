<template>
  <div class="d-flex flex-row flex-nowrap overflow-auto">
    <div class="mr-3">
        <foto-card/>
    </div>
    <div>
        <foto-card/>
    </div>
    <div>
        <foto-card/>
    </div>
  </div>
</template>

<script>
import FotoCard from '@/components/ui/FotoCard.vue';

export default {
  name: 'HorizontalFotos',
  components: {
    FotoCard,
  },
};
</script>

<style>

</style>
