<template>
  <div
    :class="{
      'd-flex flex-row-reverse align-items-center': reverse,
      'd-flex align-items-center': !reverse,
      'd-flex flex-column justify-content-end': verticalAlignment}"
  >
      <img
        :style="widthPx ? `width: ${widthPx}px!important;` : `width: ${widthPer}%!important;`"
        :src="auth ? user.profile : otherUser.profile"
        :alt="auth ? user.profile : otherUser.profile"
        class="profile-pic"
      >
      <div v-if="displayName" class="ml-1 name align-self-center">
        <h4
          class="m-0"
        >
          {{auth ? user.name : otherUser.username}}
        </h4>
      </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
// import firebase from 'firebase';

export default {
  name: 'Avatar',
  props: {
    reverse: {
      type: Boolean,
      default: false,
    },
    displayName: Boolean,
    auth: {
      type: Boolean,
      default: true,
    },
    userId: {
      type: String,
      required: false,
    },
    widthPx: {
      type: Number,
      required: false,
    },
    widthPer: {
      type: Number,
      default: 25,
    },
    verticalAlignment: {
      type: Boolean,
      default: false,
    },
  },
  async mounted() {
    if (this.auth === false) {
      this.otherUser = await this.findUser(this.userId);
      console.log(this.findUser(this.userId), 'usuario');
    }
  },
  data() {
    return {
      otherUser: {},
    };
  },
  computed: {
    ...mapGetters({
      findUser: 'auth/findUser',
    }),
    ...mapState(
      {
        user: (state) => state.auth.profileUser,
      },
    ),
  },
};
</script>

<style lang='scss' scoped>
.name{
  text-transform: capitalize;
}
h4{
  font-family: $title;
  margin-block-end: unset;
  font-size:2vw;
  color: $alpha-white;
}
.profile-pic{
  border-radius: 50%;
}
</style>
