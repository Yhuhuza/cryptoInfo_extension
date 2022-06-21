const changeTab = {
  methods: {
    changeTab(page) {
      this.$store.commit('update', {
        page: page,
      });
    }
  }
}

export {
  changeTab,
}