<template>
<div class="custom-file">
  <h4>
    Sube tus archivos
  </h4>
  <div class="text-center" v-if="loading">
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
  <div v-if="imagesIds !== [] || videoId !== ''"
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
      @click="removeImage(imageIndex)"
    />
      <img :src="image" alt="" style="width:50px;">
    </div>
    <div v-if="videoId !== ''" class="video-preview">
    <i
      class="fa fa-times m-1"
      style="font-size:.9em; color:red;"
      aria-hidden="true"
      @click="removeVideo"
    />
      <video width="30" height="24" controls>
      <source :src="videoId" type="video">
      </video>
    </div>
    <div class="save-all">
      <button @click="uploadFiles">
        Subir todos
      </button>
    </div>
  </div>
  <div v-if="!addingMedia" class="cta d-flex justify-content-around">
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
  <a v-if="addingMedia" @click="addingMedia = false">Cancelar</a>
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
    };
  },
  props: {
    model: {
      type: String,
      default: 'm1',
    },
  },
  methods: {
    uploadFiles(){
      
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
    },
  },
};
</script>

<style lang="scss">
a{
  text-decoration: underline;
}
</style>
