<template>
  <div
    :class="{
      'd-flex flex-row align-items-center justify-content-start': reverse,
      'd-flex align-items-center flex-column': !reverse,
      'd-flex flex-column justify-content-end': verticalAlignment,
    }"
  >
    <slot />
    <div :class="{'picture-horizontal': reverse}">
      <img
        :style="
          widthPx
            ? `width: ${widthPx}px!important;`
            : `width: ${widthPer}%!important;`
        "
        :src="auth ? user.profile : otherUser.profile"
        :alt="auth ? user.profile : otherUser.profile"
        class="profile-pic"
      />
    </div>

    <div v-if="displayName" :class="{'postName': reverse}" class="ml-1 name">
      <h5 class="m-0">{{ auth ? user.name : otherUser.username }}</h5>
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

    ...mapState({
      user: (state) => state.auth.profileUser,
    }),
  },
};
</script>

<style lang="scss" scoped>
.picture-horizontal {
  flex-basis: 10%;
}
.postName {
  h5 {
    color: $alpha-white;
    font-size: calc(var(--h5) * 0.62);
  }
}

.name {
  text-transform: capitalize;
}

h5 {
  font-family: $title;
  margin-block-end: unset;
  color: $alpha;
}
.profile-pic {
  border-radius: 50%;
}
</style>
