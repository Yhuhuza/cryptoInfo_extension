<template>
  <div class="main-body">
    <component :is="page"></component>
  </div>
</template>

<script>
import CryptoInfo from '../CryptoInfo/CryptoInfo.vue';
import CryptoNews from '../CryptoNews/CryptoNews.vue';
import CryptoNote from '../CryptoNote/CryptoNote.vue';
import AddNote from '../CryptoNote/AddNote.vue';
import CryptoSettings from '../CryptoSettings/CryptoSettings.vue';
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  components: {
    CryptoInfo,
    CryptoNews,
    CryptoNote,
    CryptoSettings,
    AddNote,
  },
  setup() {
    const store = useStore();
    const page = computed(() => store.state.page);

    return {
      page
    }
  },
}
</script>


<style scoped>

.main-body {
  border-left: 2px solid #333;
  border-right: 2px solid #333;
  border-top: 2px solid #333;
  height: 76%;
  background: #333;
  overflow: scroll;
}

::-webkit-scrollbar {
  width: 2px;
  height: 0;
  /*color: orange;*/
}

::-webkit-scrollbar-track {
  background-color: #333;
}

::-webkit-scrollbar-thumb {
  border-radius: 15px;
  height: 5px;
  background-color: orange;
}

</style>