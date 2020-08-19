<template>
  <div class="alpha mt-5">
    <h4>{{ uploaded ? 'Tus calificaciones' : 'Califica sus características' }}</h4>
    <div class="review-preview d-flex">
      <div
        class="individual-review m-4"
        v-for="(completeReview, completeReviewIndex) in Object.keys(
          this.featureReviews,
        )"
        :key="completeReviewIndex"
      >
        <i class="fa fa-check-circle" style=" color:green;" aria-hidden="true"></i>
        <p>{{ completeReview }}</p>
      </div>
    </div>
    <div
      class="cta-add-features"
      v-if="selectedFeature === '' && !uploaded"
      @click.prevent="addingFeature = true"
    >
      <basic-button
        :content="
          featureReviews === {}
            ? 'Elegir características'
            : 'Agregar otra cracterística'
        "
        :secondary="true"
      />
    </div>
    <div class="select-feature" v-if="addingFeature && !uploaded">
      <div class="input-feature" v-if="selectedFeature === ''">
        <label for="recipient-name" class="alpha col-form-label">¿Qué característica?</label>
        <select v-model="selectedFeature" class="custom-select" id="brand-name">
          <option
            v-for="(feature, featureIndex) in features"
            class="input-feature"
            :key="featureIndex"
            :value="feature"
          >{{ feature }}</option>
        </select>
      </div>
      <div class="review-feature" v-if="selectedFeature !== ''">
        <label for="customRange1">{{ selectedFeature }}</label>
        <input v-model="featureReview" type="range" class="custom-range" id="customRange1" />
        <a class="cta-add-review-q" @click="pushReviewToGlobalReviews">Añadir calaficación</a>
      </div>
    </div>
    <div class="cta-upload-review mt-4" v-if="ready && !uploaded" @click="uploadReview">
      <button :main="true">
        <i class="fa fa-check" aria-hidden="true"></i>
        Subir calificaciones
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ReviewsInput',
  created() {
    this.$store.dispatch('posts/fetchAllFeatures');
  },

  props: {
    model: {
      type: String,
      default: 'm1',
    },
  },

  methods: {
    pushReviewToGlobalReviews() {
      this.featureReviews[this.selectedFeature] = this.featureReview;
      this.ready = true;
      this.addingFeature = false;
      this.selectedFeature = '';
    },

    async uploadReview() {
      await this.$store.dispatch('posts/submitReview', this.featureReviews);
      this.uploaded = true;
      this.$emit('uploadedReview', this.$store.state.posts.newReview);
    },

    deleteReview(completeReview) {
      delete this.featureReviews[completeReview];
    },
  },

  data() {
    return {
      ready: false,
      featureReviews: {},
      selectedFeature: '',
      featureReview: 0,
      addingFeature: false,
      uploaded: false,
    };
  },

  computed: {
    ...mapState({
      features: (state) => state.posts.features,
    }),
  },
};
</script>

<style lang="scss">
.cta-upload-review {
  text-align: center;
  button {
    background: $main-gradient;
    color: white !important;
    padding: 2% 8%;
    border-radius: 8px;
    border: none !important;
  }
}
.cta-add-review-q {
  font-family: Oswald;
  padding: 0.3em 1.5em;
  color: #fcac00;
  border: 3px solid #fcac00;
  border-radius: 4px;
  background-color: transparent;
}
</style>
