<template>
  <div class="crypto-news">
    <div v-if="newsList">
      <div class="navigation-block">
        <p class="news-block">{{ $t('footer.news') }}</p>
        <img
            class="arrow-left"
            src="../../../assets/arrow-slider.svg"
            @click="previousSlide"
        />
        <img
            class="arrow-right"
            :style="{transform: 'rotate(180deg)'}"
            src="../../../assets/arrow-slider.svg"
            @click="nextSlide"
        />
      </div>
      <no-information v-if="newsList?.length <= 0"></no-information>
      <crypto-news
        class="crypto-news-card"
        v-for="(item, index) in newsList"
        :key="`item-${index}`"
        :item="item"
        :current-slide="currentSlide"
        :index="index"
        :type="true"
      />
    </div>
  </div>
</template>

<script>
import cryptoNews from './NewsCard.vue';
import noInformation from '../NoInformationPage/NoInformation.vue'
import { useStore } from "vuex";
import { computed } from 'vue';

export default {
  components: {
    cryptoNews,
    noInformation,
  },
  data: () => ({
    currentSlide: 0,
    sliderInterval: null,
  }),
  mounted() {
    this.sliderInterval = setInterval(() => {
      this.nextSlide();
    }, 10000);
  },
  beforeUnmount() {
    clearInterval(this.sliderInterval);
  },
  methods: {
    setCurrentSlide(index) {
      this.currentSlide = index;
    },
    nextSlide() {
      const index = this.currentSlide < this.newsList.length - 1 ? this.currentSlide + 1 : 0;
      this.setCurrentSlide(index);
    },
    previousSlide() {
      const index = this.currentSlide > 0 ? this.currentSlide - 1 : this.newsList.length - 1;
      this.setCurrentSlide(index);
    }
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
  height: 455px;
  overflow: hidden;
}

.news-block {
  color: #FFFFFF;
}

.navigation-block {
  display: flex;
  align-items: center;
  margin-left: 18px;
  height: 66px;
}

.news-block {
  font-family: Gilroy, sans-serif;
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
