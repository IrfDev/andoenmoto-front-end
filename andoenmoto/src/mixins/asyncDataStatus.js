const asyncDataStatus = {
  data() {
    return {
      asyncDataStatus_ready: false,
    };
  },
  methods: {
    asyncDataStatus_fetched() {
      this.asyncDataStatus_ready = true;
    },
  },
};

export default asyncDataStatus;
