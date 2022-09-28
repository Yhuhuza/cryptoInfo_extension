<template>
  <div class="crypto-info">
    <div class="search-bar">
      <p class="name-of-section">{{ $t('rates.rates') }}</p>
      <img class="search-sign"  src="../../../assets/find-sign.svg"/>
    </div>
<!--    <button class="refresh-rates" @click="refreshRates()">{{ $t('rates.refreshRates') }}</button>-->
    <div class="crypto-card-block">
      <crypto-card
          class="crypto-card"
          v-for="(item, index) in ratesList"
          :key="index"
          :item="item"
          :type="true"
      />
    </div>
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
  display: inline-flex;
  width: 390px;
  margin-top: 10px;
  flex-direction: column;
}

/*.refresh-rates {*/
/*  text-decoration: none;*/
/*  background-color: #333;*/
/*  color: white;*/
/*  border: 2px solid orange;*/
/*  width: 200px;*/
/*  height: 40px;*/
/*  font-size: 16px;*/
/*  margin: 0 0 0 90px;*/
/*  cursor: pointer;*/
/*}*/

.search-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.name-of-section {
  margin: 11px 16px;
  font-weight: 600;
  font-size: 24px;
  color: #FFFFFF;
}

.search-sign {
  cursor: pointer;
  width: 40px;
  height: 40px;
  margin-right: 16px;
}

.search-sign:hover {
  background: #7276FF;
  border-radius: 5px;
  transition: 0.5s;
}

.crypto-card-block {
  margin-top: 0;
  display: inline-flex;
  margin-left: 16px;
  /*border: 1px solid red;*/
  flex-direction: column;
}

</style>
