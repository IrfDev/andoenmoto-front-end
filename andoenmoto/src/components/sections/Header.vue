<template>
  <div>
    <logo/>
    <div class="row m-0 justify-content-center">
      <h1>Ando en moto</h1>
      <h2>Reseñas y fotos de productos para moto</h2>
      <basic-button
       :content="'Subir Reseña'" :main="true"
       data-toggle="modal"
       data-target="#exampleModal"
      />
      <basic-button
       :content="'Iniciar sesión'"
       :secondary="true"
      />
    </div>
    <post-form
    class="modal fade"/>
  </div>
</template>

<script>
import logo from '@/components/ui/basics/logo.vue';
import PostForm from '@/components/ui/basics/PostForm.vue';

export default {
  name: 'Header',
  components: {
    PostForm,
    logo,
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
