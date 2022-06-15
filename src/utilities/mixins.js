const changeTab = {
  methods: {
    changeTab(page) {
      console.log('PAGE:', page);
      this.$store.commit('update', {
        page: page,
      });
    }
  }
}

export {
  changeTab,
}