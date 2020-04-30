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
    <basic-button
        :main="true"
        :content="'Ver fotos'"
    />
    <basic-button
        :secondary="true"
        :content="'Ver posts'"
    />
</div>
</template>

<script>
export default {
  name: 'FixedCtas',
};
</script>

<style lang="scss" scoped>
.fixed-cta {
z-index: 100;
}
</style>
