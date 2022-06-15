<template>
  <div class="crypto-info">
    <button class="refresh-rates" @click="refreshRates()">{{ $t('rates.refreshRates') }}</button>
    <crypto-card
        class="crypto-card"
        v-for="(item, index) in ratesList"
        :key="index"
        :item="item"
        :type="true"
    />
  </div>
</template>

<script>
import cryptoCard from './CryptoCard.vue';
import { mapState } from "vuex";

export default {
  methods: {
    refreshRates() {
      chrome.runtime.sendMessage({ action: 'instantUpdateRates'}, (result) => {
        this.$store.commit('update', {
          ratesList: result,
        })
      })
    }
  },
  components: {
    cryptoCard,
  },
  data() {
    return {

    }
  },
  computed: {
    ...mapState([
      'ratesList',
    ]),
  }
}
</script>

<style scoped>

.crypto-info {
  width: 390px;
  margin-top: 10px;
}

.refresh-rates {
  text-decoration: none;
  background-color: #333;
  color: white;
  border: 2px solid orange;
  width: 200px;
  height: 40px;
  font-size: 16px;
  margin: 0 0 0 90px;
  cursor: pointer;
}


</style>