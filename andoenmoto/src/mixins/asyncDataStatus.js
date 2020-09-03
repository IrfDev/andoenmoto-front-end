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

  filters: {
    translateName: (name) => {
      switch (name) {
        case 'Motocicletas':
          return 'Motorcycles';
        case 'Accesorios':
          return 'Accesories';
        case 'Refacciones':
          return 'Parts';

        default:
          return name;
      }
    },
  },
};

export default asyncDataStatus;
