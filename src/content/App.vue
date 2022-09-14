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
  /*font-family: Roboto;*/
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 999999999999999999999;
}
</style>
