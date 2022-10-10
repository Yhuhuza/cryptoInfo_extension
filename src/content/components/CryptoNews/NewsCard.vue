<template>
  <transition name="slide-in">
    <div
        class="news-card"
        v-if="checkImage"
        v-show = "currentSlide === index"
    >
      <div class="image-wrapper">
        <img class="news-image" :src="item.urlToImage"/>
      </div>
      <div class="news-text">
        <div class="title-wrapper">
          <p class="news-title">
            {{ limitStr(item.title, 55) }}
          </p>
        </div>
        <div class="description-wrapper">
          <p class="news-description">
            {{ limitStr(item.description, 70) }}
          </p>
        </div>
        <div class="news-button">
          <button class="read-more-button"><a  target="_blank" :href="setUrl">
            {{ $t('news.readMore') }}
          </a></button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { computed } from 'vue';

export default {
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    currentSlide: Number,
    index: Number,
  },
  setup(props) {
    const setUrl = computed(() => props.item.url);
    const checkImage = computed(() => props.item.urlToImage);
    function limitStr (str, n, symb) {
      if (!n && !symb) return str;
      symb = symb || '...';
      return str.substr(0, n - symb.length) + symb;
    }

    return {
      setUrl,
      checkImage,
      limitStr,
    }
  },
}

</script>

<style scoped>

.news-card {
  width: 368px;
  height: 385px;
  background-color: #2A2C31;
  margin-left: 16px;
  backdrop-filter: blur(10px);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 20px;
}

p {
  width: 325px;
  padding: 2px 5px;
}

.image-wrapper {
  height: 0;
  padding-top: 35%;
  position: relative;
  display: block;
  margin: 10px;
}

.news-image {
  position: absolute;
  top: 63px;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 368px;
  height: 148px;
  margin-bottom: 24px;
}

.news-text {
  margin-left: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: flex-start;
}

.news-title {
  font-size: 20px;
  color: #FFFFFF;
  margin-bottom: 8px;
}

.news-description {
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #FFFFFF;
}

.read-more-button {
  padding: 12px 16px;
  width: 125px;
  height: 43px;
  background: #7276FF;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 8px;
  border: none;
}

.read-more-button a {
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  color: #FFFFFF;
  text-decoration: none;
}

.slide-in-enter-active,
.slide-in-leave-active {
  transition: all 1s ease-in-out;
}

.slide-in-enter-from {
  transform: translateX(-100%);
}

.slide-in-leave-to {
  transform: translateX(-100%);
}
</style>
