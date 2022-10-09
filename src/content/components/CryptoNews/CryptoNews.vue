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

.navigation-block {
  display: flex;
  align-items: center;
  margin-left: 18px;
  margin-bottom: 23px;
}

.news-block {
  /*font-family: 'Gilroy';*/
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
}

.arrow-left {
  margin-left: 232px;
  cursor: pointer;
}

.arrow-right {
  cursor: pointer;
  border: 1px solid #7276FF;
  height: 28px;
  border-radius: 5px;
  margin-right: 16px;
}

</style>
