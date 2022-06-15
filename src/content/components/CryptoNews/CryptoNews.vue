<template>
  <div class="crypto-news">
    <div v-if="newsList">
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
import { mapState } from 'vuex';

export default {
  components: {
    cryptoNews,
  },
  computed: {
    ...mapState([
        'newsList',
    ])
  },
}

</script>

<style scoped>

.crypto-news {
  width: 390px;
}

</style>