<template>
  <div class="news-card" v-if="checkImage">
    <div class="image-wrapper">
      <img class="news-image" :src="this.item.urlToImage"/>
    </div>
    <div class="news-text">
      <div class="title-wrapper">
        <div class="news-title">
          {{ this.item.title }}
        </div>
      </div>
      <div class="description-wrapper">
        <div class="news-description">
          {{ this.item.description }}
        </div>
      </div>
      <div class="news-button">
        <button class="read-more-button"><a  target="_blank" :href="setUrl">
          {{ $t('news.readMore') }}
        </a></button>
      </div>
      <div class="time-wrapper">
        {{ setDate }}
      </div>
    </div>
  </div>
</template>

<script>
import { dateFormat } from '@/utilities/parser';

export default {
  data() {
    return {
      newsImage: this.item.urlTiImage,
      urlTo: this.item.url,
    }
  },
  props: {
    item: {
      type: Object,
      default: () => ({}),
    }
  },
  computed: {
    setUrl(){
      return this.item.url;
    },
    setDate() {
      return dateFormat(this.item.publishedAt);
    },
    checkImage() {
      return this.item.urlToImage;
    }
  }
}

</script>

<style scoped>

.news-card {
  height: 390px;
  border: 2px solid orange;
  margin: 10px 10px;
}

.image-wrapper {
  height: 0;
  padding-top: 45%;
  position: relative;
  display: block;
  margin: 10px;
}

.news-image {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: 100%;
  max-width: 100%;
}

.news-text {
  margin: 5px 20px;
  display: flex;
  align-content: center;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.title-wrapper {
  text-overflow: ellipsis;
  overflow: hidden;
}

.news-title {
color: white;
font-size: 16px;
padding: 10px 10px 0;
text-align: center;
height: 50px;
}


.news-description {
  text-align: center;
  color: white;
  font-size: 12px;
  padding: 10px 0 0;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow-y: hidden;
}

.news-description::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.read-more-button {
  margin-top: 10px;
  width: 150px;
  height: 35px;
  background-color: #333;
  border: 1px #00FFFF solid;
  cursor: pointer;
}

.read-more-button a {
  text-decoration: none;
  color: orange;
  font-size: 16px;
}

.time-wrapper {
  color: white;
  padding-top: 10px;
  font-size: 11px;
  font-style: italic;
}

</style>