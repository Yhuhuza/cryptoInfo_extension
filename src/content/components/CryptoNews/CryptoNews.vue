<template>
  <div class="crypto-news">
    <div v-if="newsList">
      <div class="navigation-block">
        <p class="news-block">{{ $t('footer.news') }}</p>
        <img class="arrow-left" src="../../../assets/arrow-slider.svg" />
        <img class="arrow-right" :style="{transform: 'rotate(180deg)'}" src="../../../assets/arrow-slider.svg" />
      </div>
      <crypto-news
        class="crypto-news-card"
        v-for="(item, index) in newsList"
        :key="index"
        :item="item"
        :type="true"
      >
      </crypto-news>
    </div>
  </div>
</template>

<script>
import cryptoNews from './NewsCard.vue';
import { useStore } from "vuex";
import { computed } from 'vue';

export default {
  components: {
    cryptoNews,
  },
  setup() {
    const store = useStore();
    const newsList = computed(() => store.state.newsList);

    return {
      newsList,
    }
  },
}

</script>

<style scoped>

.crypto-news {
  width: 390px;
}

.news-block {
  color: #FFFFFF;
}

</style>
