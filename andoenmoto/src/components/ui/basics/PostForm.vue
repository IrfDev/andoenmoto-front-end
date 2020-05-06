<template>
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
    <lightie-row>
        <avatar
          :widthPx="100"
        />
    </lightie-row>
      <div class="modal-header  align-self-center">
        <h5 class="modal-title alpha" id="exampleModalLabel">Subir reseña</h5>
      </div>
      <div class="modal-body alpha">
        <form>
          <div class="form-group alpha" :class="{super:newPost.title}">
            <label for="recipient-name" class="alpha col-form-label">Título:</label>
            <input v-model="newPost.title" type="text" class="form-control" id="title-name">
          </div>
          <div class="form-group mb-3" :class="{super:newPost.category}" v-if="newPost.title">
            <label class="input-text" for="category-name">Categoría</label>
            <select v-model="newPost.category"
              class="form-control custom-select" id="category-name">
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
              >
                {{category.name}}
              </option>
            </select>
          </div>
          <div class="form-group mb-3" :class="{super:newPost.brand}" v-if="newPost.category">
            <label class="input-text" for="brand-name">Marca:</label>
            <select v-model="newPost.brand" class="custom-select" id="brand-name">
              <option
                v-for="brand in brands"
                :key="brand.id"
                :value="brand.id"
              >
                {{brand.name}}
              </option>
            </select>
          </div>
          <div class="form-group mb-3" :class="{super:newPost.style}" v-if="newPost.brand">
            <label class="input-text" for="style-name">Estílo:</label>
            <select v-model="newPost.style" class="custom-select" id="style-name">
              <option
                v-for="style in styles"
                :key="style.id"
                :value="style.id"
              >
                {{style.title}}
              </option>
            </select>
          </div>
          <div class="form-group alpha" :class="{super: newPost.model}" v-if="newPost.style">
            <label for="recipient-name" class="alpha col-form-label">Modelo:</label>
            <input v-model="newPost.model" type="text" class="form-control" id="model-name">
          </div>
          <media-input
            :class="{super:newPost.images || newPost.video}"
            @uploadedMedia="addingMedia($event)"
            v-if="newPost.model"
            :model="newPost.model"
          />
          <reviews-input
            :model="newPost.model"
            v-if="media"
            :class="{super: newPost.review}"
            @uploadedReview="addingReview($event)"
          />
          <div class="form-group" v-if="newPost.review">
            <label for="message-text" class="alpha col-form-label">Comentarios:</label>
            <textarea v-model="newPost.content" class="form-control" id="message-text"></textarea>
          </div>
        </form>
      </div>
      <div class="modal-footer d-flex justify-content-around">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        <button @click="submitPost" data-dismiss="modal"
          type="button" class="btn btn-primary"
        >
          Enviar reseña
        </button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'PostForm',
  components: {
    ReviewsInput: () => import('./forms/ReviewsInput.vue'),
    MediaInput: () => import('./forms/MediaInput.vue'),
  },
  created() {
    this.$store.dispatch('categories/fetchAllCategories');
    this.$store.dispatch('brands/fetchAllBrands');
    this.$store.dispatch('styles/fetchAllStyles');
  },
  methods: {
    submitPost() {
      this.$store.dispatch('posts/submitPost', this.newPost);
    },

    addingMedia(e) {
      this.newPost.images = e.images;
      this.newPost.video = e.video;
      this.media = true;
    },

    addingReview(e) {
      console.log(e);
      this.newPost.review = e;
    },
  },
  data() {
    return {
      categories: this.$store.state.categories.items,
      styles: this.$store.state.styles.items,
      newPost: {},
      media: false,
    };
  },
  computed: {
    brands() {
      return Object.values(this.$store.state.brands.items)
        .filter((brand) => brand.categories[this.newPost.category]);
    },
  },
};
</script>

<style lang="scss" scoped>
.super{
  transition: .5s ease-in-out;
  background: $complementary-gradient!important;
  border-radius:8px;
  color: white!important;
  h4{
    color: white!important;
  }
  label{
    color:white!important;
    font-family: $title;
  }
  input{
    font-family: $paragraph;
    background: $complementary-gradient;
    border: none;
    color: white;
    text-align:center;
  }
  select{
    background: $complementary-gradient;
    border: none;
    color: white;
    text-align-last:center!important;
  }
}
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
.alpha{
  color:$alpha!important;
}
.btn-primary{
  background: $complementary-gradient;
  border: none;
  font-family: $title;
}
.btn-secondary{
  background: #592323;
  border: none;
  font-family: $title;
}
</style>
