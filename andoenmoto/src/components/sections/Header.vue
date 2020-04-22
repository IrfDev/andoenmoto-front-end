<template>
  <div>
    <logo/>
    <div class="row m-0 justify-content-center">
      <h1>Ando en moto</h1>
      <h2>Reseñas y fotos de productos para moto</h2>
      <buttonn
       :content="'Subir Reseña'" :main="true"
      />
      <buttonn
       :content="'Ver reseñas'" :secondary="true"
      />
    </div>
  </div>
</template>

<script>
import dataSource from '@/lib/data.json';
import logo from '@/components/ui/basics/logo.vue';
import buttonn from '@/components/utilities/button.vue';

export default {
  name: 'HelloWorld',
  components: {
    logo,
    buttonn,
  },
  data() {
    return {
      categories: dataSource.categories,
      posts: dataSource.posts,
      users: dataSource.posts,
      brands: dataSource.brands,
      models: dataSource.models,
    };
  },
};
</script>

<style lang="scss" scoped>
h1 {
font-family: $typo;
font-weight: $light;
font-size: 20vw;
}
h2{
font-family: $title;
font-weight: $bold;
font-size:6vw;
}
*{
  color: $alpha-white;
}
</style>
