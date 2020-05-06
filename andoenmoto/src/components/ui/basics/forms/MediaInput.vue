<template>
<div class="custom-file form-group">
  <h4>
    {{uploaded ? 'Tus archivos' : 'Sube tus archivos'}}
  </h4>
  <div class="text-center" v-if="loading">
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
  <div v-if="imagesIds !== [] || videoId !== '' || uploaded"
    class="files-preview d-flex justify-content-around"
  >
    <div
      v-for="(image, imageIndex) in imagesIds"
      :key="imageIndex"
      class="image-preview"
    >
    <i class="fa fa-times m-1"
      style="font-size:.9em; color:red;"
      aria-hidden="true"
      v-if="!uploaded"
      @click="removeImage(imageIndex)"
    />
      <img :src="image" alt="" style="width:50px; border-radius:8px;">
    </div>
    <div v-if="videoId !== ''" class="video-preview">
    <i
      class="fa fa-times m-1"
      style="font-size:.9em; color:red;"
      aria-hidden="true"
      v-if="!uploaded"
      @click="removeVideo"
    />
      <video width="30" height="24" controls>
      <source :src="videoId" type="video">
      </video>
    </div>
  </div>
  <div v-if="!addingMedia && !uploaded" class="cta d-flex justify-content-around">
    <div class="cta-image" @click.prevent="addMedia('image')">
      <basic-button
        :content="'Añadir Imagen'"
        :main="true"
        style="font-size: 1em;"
      />
    </div>
    <div class="cta-video" v-if="videoId === ''" @click.prevent="addMedia('video')">
      <basic-button
        style="font-size: 1em;"
        :content="'Añadir video'"
        :secondary="true"
      />
    </div>
  </div>
  <div class="media-input" v-if="addingMedia">
      <input
        type="file"
        :accept="media === 'video' ? '.mp4, .mov' : '.jpg, .png'"
        capture="camera"
        class="custom-file-input"
        id="inputGroupFile01"
        aria-describedby="inputGroupFileAddon01"
        @change="processFile($event)"
      >
      <label class="custom-file-label" for="inputGroupFile01">
        Subir {{media === 'image' ? 'imagen' : 'video'}}
      </label>
  </div>
  <a class="cancel-a" v-if="addingMedia" @click="addingMedia = false">Cancelar</a>
   <div v-if="ready && !uploaded" @click="uploadFiles" class="save-all mt-3">
      <button :secondary="true">
        <i class="fa fa-check" aria-hidden="true"></i>
        Subir archivos
      </button>
    </div>
</div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'MediaInput',
  data() {
    return {
      addingMedia: false,
      media: '',
      imagesIds: [],
      videoId: '',
      loading: false,
      ready: false,
      uploaded: false,
    };
  },
  props: {
    model: {
      type: String,
      default: 'm1',
    },
  },
  methods: {
    uploadFiles() {
      this.$emit('uploadedMedia', { images: this.imagesIds, video: this.videoId });
      this.uploaded = true;
    },

    removeImage(imageIndex) {
      this.imagesIds.splice(imageIndex, 1);
    },

    removeVideo() {
      this.videoId = '';
    },

    addMedia(fileType) {
      console.log(fileType);
      this.addingMedia = true;
      this.media = fileType;
    },

    async processFile(e) {
      this.loading = true;
      const ref = firebase.storage()
        .ref(`/${this.media}/${this.model}/${e.target.files[0].name}`);
      await ref.put(e.target.files[0])
        .then((refie) => {
          if (this.media === 'image') {
            ref.getDownloadURL().then((url) => {
              console.log(refie);
              this.$store.dispatch('posts/uploadImage', {
                model: this.model, url,
              });
              this.imagesIds.push(url);
              this.addingMedia = false;
            });
          } else {
            ref.getDownloadURL().then((url) => {
              console.log(refie);
              this.$store.dispatch('posts/uploadVideo', {
                model: this.model, url,
              });
              this.videoId = url;
              this.addingMedia = false;
            });
          }
        });
      this.loading = false;
      this.ready = true;
    },
  },
};
</script>

<style lang="scss">
.save-all{
  button{
    background: $main-gradient;
    color:white!important;
    padding: 2% 8%;
    border-radius: 8px;
    border:none!important;
  }
}
a{
  text-decoration: underline;
}
.cancel-a{
  color:red;
  text-decoration: underline;
}
</style>
