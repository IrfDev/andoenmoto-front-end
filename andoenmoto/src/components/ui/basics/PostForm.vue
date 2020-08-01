<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered text-center" role="document">
      <div class="modal-content pt-3" v-if="notAuth">
        <lightie-row>
          <avatar :widthPx="100" class="avatar-form-post" />
        </lightie-row>
        <div class="modal-header align-self-center">
          <h5 class="modal-title alpha" id="exampleModalLabel">Subir reseña</h5>
        </div>
        <div class="modal-body alpha">
          <form>
            <div class="form-group alpha" :class="{ super: newPost.title }">
              <label for="recipient-name" class="alpha col-form-label">Título:</label>
              <input v-model="newPost.title" type="text" class="form-control" id="title-name" />
            </div>
            <div class="form-group mb-3" :class="{ super: newPost.category }" v-if="newPost.title">
              <label class="input-text" for="category-name">Categoría</label>
              <select
                v-model="newPost.category"
                class="form-control custom-select"
                id="category-name"
              >
                <option
                  v-for="category in categories"
                  :key="category.id"
                  :value="category.id"
                >{{ category.name }}</option>
              </select>
            </div>
            <div class="form-group mb-3" :class="{ super: newPost.brand }" v-if="newPost.category">
              <label class="input-text" for="brand-name">Marca:</label>
              <select v-model="newPost.brand" class="custom-select" id="brand-name">
                <option v-for="brand in brands" :key="brand.id" :value="brand.id">{{ brand.name }}</option>
              </select>
            </div>

            <div class="form-group mb-3" :class="{ super: newPost.style }" v-if="newPost.brand">
              <label class="input-text" for="style-name">Estílo:</label>
              <select v-model="newPost.style" class="custom-select" id="style-name">
                <option v-for="style in styles" :key="style.id" :value="style.id">{{ style.title }}</option>
              </select>
            </div>
            <div class="form-group alpha" :class="{ super: newPost.model }" v-if="newPost.style">
              <label for="recipient-name" class="alpha col-form-label">Modelo:</label>
              <input v-model="newPost.model" type="text" class="form-control" id="model-name" />
            </div>

            <media-input
              :class="{ super: newPost.images || newPost.video }"
              @uploadedMedia="addingMedia($event)"
              v-if="newPost.model"
              :model="newPost.model"
            />

            <reviews-input
              :model="newPost.model"
              v-if="media"
              :class="{ super: newPost.review }"
              @uploadedReview="addingReview($event)"
            />

            <div class="form-group" v-if="newReview !== ''">
              <label for="message-text" class="alpha col-form-label">Comments:</label>
              <textarea v-model="newPost.content" class="form-control" id="message-text"></textarea>
            </div>
          </form>
        </div>

        <div class="modal-footer d-flex justify-content-around">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button
            @click="submitPost"
            data-dismiss="modal"
            type="button"
            class="btn btn-primary"
          >Send Review</button>
        </div>
      </div>

      <div v-else class="modal-content not-auth pt-3 pb-3">
        <div class="m-3 text-center">
          <h4>Login to upload your review</h4>
          <div class="cta mt-4">
            <router-link class="go-to-login" to="/login">Log In</router-link>
            <router-link class="go-to-login" to="/register">Register</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import firebase from 'firebase';

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
    modelExists(modelName) {
      return new Promise((resolve) => {
        firebase
          .database()
          .ref('models')
          .orderByChild('name')
          .equalTo(modelName)
          .once('value', (snapshot) =>
            snapshot.exists()
              ? resolve(snapshot.val())
              : resolve(snapshot.exists())
          );
      });
    },

    // getModelId(modelName) {
    //   return new Promise((resolve) => {
    //     firebase
    //       .database()
    //       .ref('models')
    //       .orderByChild('name')
    //       .equalTo(modelName)
    //       .once('value', (snapshot) => resolve(snapshot.val()));
    //   });
    // },

    async submitPost() {
      let modelExists = await this.modelExists(this.newPost.model);

      if (modelExists) {
        let modelId = Object.keys(modelExists);

        let newPost = { ...this.newPost, model: modelId[0] };

        this.$store.dispatch('posts/submitPost', newPost);
      } else {
        let newModelObject = this.newPost;

        await this.$store.dispatch('models/createNewModel', {
          brand: newModelObject.brand,
          category: newModelObject.category,
          name: newModelObject.model,
          style: newModelObject.style,
        });

        let newPost = {
          ...this.newPost,
          model: this.newModel,
        };

        this.$store.dispatch('posts/submitPost', newPost);
      }
    },

    addingMedia(e) {
      this.newPost.images = e.images;
      this.newPost.video = e.video;
      this.media = true;
    },

    addingReview() {
      this.newPost.review = this.newReview;
    },
  },

  computed: {
    ...mapState({
      newModel: (state) => state.models.newModel,

      newReview: (state) => state.posts.newReview,

      categories: (state) => state.categories.items,

      styless: (state) => state.styles.items,
    }),

    brands() {
      return Object.values(this.$store.state.brands.items).filter(
        (brand) => brand.categories[this.newPost.category]
      );
    },

    styles() {
      console.log(
        this.$store.state.categories.items[this.newPost.category].styles
      );

      const categoryStyles = Object.keys(
        this.$store.state.brands.items[this.newPost.brand].styles
      );
      const brandStyles = Object.keys(
        this.$store.state.categories.items[this.newPost.category].styles
      );
      const idArray = categoryStyles.filter((style) => {
        return brandStyles.includes(style);
      });

      console.log(idArray);

      return this.$store.getters['styles/stylesByArray'](idArray);
    },

    notAuth() {
      return this.$store.state.auth.authId;
    },
  },

  data() {
    return {
      newPost: {
        review: this.newReview,
      },
      media: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.avatar-form-post {
  img {
    box-shadow: 0px 4px 36px rgba(0, 0, 0, 0.14);
  }
}
.go-to-login {
  color: white;
  margin: 0.5em;
  padding: 2% 5%;
  border-radius: 8px;
  font-family: $title;
}
.go-to-login:nth-of-type(1) {
  background: $main-gradient;
}
.go-to-login:nth-of-type(2) {
  background: $complementary-gradient;
}

.not-auth {
  h4 {
    color: $alpha;
    font-family: $title;
  }
}
.super {
  transition: 0.5s ease-in-out;
  background: $complementary-gradient !important;
  border-radius: 8px;
  color: white !important;
  h4 {
    color: white !important;
  }
  label {
    color: white !important;
    font-family: $title;
  }
  input {
    font-family: $paragraph;
    background: $complementary-gradient;
    border: none;
    color: white;
    text-align: center;
  }
  select {
    background: $complementary-gradient;
    border: none;
    color: white;
    text-align-last: center !important;
  }
}
h1 {
  font-family: $typo;
  font-weight: $light;
}
h2 {
  font-family: $title;
  font-weight: $bold;
}
.alpha {
  color: $alpha !important;
}
.btn-primary {
  background: $complementary-gradient;
  border: none;
  font-family: $title;
}
.btn-secondary {
  background: #592323;
  border: none;
  font-family: $title;
}
</style>
