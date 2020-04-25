<template>
<div class="row mt-3 ">
    <category-badge
        :colWidth="12"
        :name="'Motocicletas'"
        :image="'/categories/motocicletas.png'"
    />
    <category-badge
        :colWidth="4"
        :name="'Guantes'"
        :image="'/categories/guantes.png'"
    />
    <category-badge
        :colWidth="4"
        :name="'Cascos'"
        :image="'/categories/cascos.png'"
    />
    <category-badge
        :colWidth="4"
        :name="'Botas'"
        :image="'/categories/botas.png'"
    />
    <category-badge
        :colWidth="6"
        :name="'Accesorios'"
        :image="'/categories/accesorios.png'"
    />
    <category-badge
        :colWidth="6"
        :name="'Refacciones'"
        :image="'/categories/refacciones.png'"
    />
</div>
</template>

<script>
import CategoryBadge from '@/components/ui/basics/CategoryBadge.vue';

export default {
  name: 'Categories',
  components: {
    CategoryBadge,
  },
};
</script>

<style>

</style>
