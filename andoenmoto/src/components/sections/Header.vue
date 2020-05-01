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
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
  <div class="modal-dialog modal-dialog-centered " role="document">
    <div class="modal-content">
        <avatar/>
      <div class="modal-header">
        <h5 class="modal-title alpha" id="exampleModalLabel">Enviar reseña</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body alpha">
        <form>
          <div class="form-group alpha">
            <label for="recipient-name" class="alpha col-form-label">Título:</label>
            <input v-model="newPost.title" type="text" class="form-control" id="title-name">
          </div>
          <div class="form-group alpha">
            <label for="recipient-name" class="alpha col-form-label">Marca:</label>
            <input v-model="newPost.brand" type="text" class="form-control" id="brand-name">
          </div>
          <div class="form-group alpha">
            <label for="recipient-name" class="alpha col-form-label">Modelo:</label>
            <input v-model="newPost.model" type="text" class="form-control" id="model-name">
          </div>
          <div class="form-group alpha">
            <label for="recipient-name" class="alpha col-form-label">Imagen:</label>
            <input v-model="newPost.image" type="text" class="form-control" id="image-name">
          </div>
          <div class="form-group alpha">
            <label for="customRange1" class="alpha">Comodidad</label>
            <input
              v-model="newPost.review"
              type="range"
              class="custom-range"
              id="comfort-rangeq"
            >
          </div>
          <div class="form-group">
            <label for="message-text" class="alpha col-form-label">Contenido:</label>
            <textarea v-model="newPost.content" class="form-control" id="message-text"></textarea>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button @click="submitPost" type="button" class="btn btn-primary">Enviar reseña</button>
      </div>
    </div>
  </div>
</div>
    </div>
  </div>
</template>

<script>
import logo from '@/components/ui/basics/logo.vue';

export default {
  name: 'Header',
  methods: {
    submitPost() {
      this.$store.dispatch('submitPost', this.newPost);
    },
  },
  data() {
    return {
      newPost: {},
    };
  },
  components: {
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
.alpha{
  color:$alpha!important;
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
