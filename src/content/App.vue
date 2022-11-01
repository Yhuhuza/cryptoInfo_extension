<template>
  <main-menu id="crypto-info" v-if="showApp"></main-menu>
</template>

<script>
import MainMenu from './components/MainMenu/MainMenu.vue';
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  components: {
    MainMenu,
  },
  setup() {
    const store = useStore();
    const showApp = computed(() => store.state.showApp);

    return {
      showApp,
    }
  },
}
</script>

<style>
#crypto-info {
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 999999999999999999999;
}

@font-face {
  font-family: Gilroy;
  src: url('../assets/fonts/Gilroy-Regular.ttf') format("truetype");
}
</style>
