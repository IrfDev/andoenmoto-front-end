<template>
<div class="
    d-none
    cta-model-view
    fixed-bottom
    justify-content-center
    text-center
    fixed-ctas
    "
>
    <buttonn
        :main="true"
        :content="'Ver fotos'"
    />
    <buttonn
        :secondary="true"
        :content="'Ver posts'"
    />
</div>
</template>

<script>
import Buttonn from '@/components/utilities/button.vue';

export default {
  name: 'FixedCtas',
  components: {
    Buttonn,
  },
};
</script>

<style lang="scss" scoped>
.fixed-cta {
z-index: 100;
}
</style>
