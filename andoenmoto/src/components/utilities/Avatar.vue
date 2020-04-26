<template>
  <div class="rounded-circle overflow-hidden w-50 img-fluid">
      <img :src="user.profile" :alt="user.profile" class="img-fluid">
      <h4
        class='d-none'
      >
        {{user.name}}
      </h4>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Avatar',
  props: {
    displayName: Boolean,
  },
  computed: {
    ...mapGetters(
      { user: 'authUser' },
    ),
  },
};
</script>

<style>

</style>
