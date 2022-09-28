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
  height: 76%;
  background: #1F2125;
  overflow: scroll;
}

::-webkit-scrollbar {
  display: none;
}

</style>
