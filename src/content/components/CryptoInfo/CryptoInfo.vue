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
import { computed } from 'vue';
import { useStore } from "vuex";

export default {
  components: {
    cryptoCard,
  },
  setup () {
    const store = useStore();
    const ratesList = computed(() => store.state.ratesList);

    function refreshRates() {
      chrome.runtime.sendMessage({ action: 'instantUpdateRates'}, (result) => {
        store.commit('update', {
          ratesList: result,
        })
      })
    }

    return {
      refreshRates,
      ratesList,
    }
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