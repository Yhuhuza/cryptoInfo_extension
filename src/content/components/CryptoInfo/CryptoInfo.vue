<template>
  <div class="crypto-info">
    <div class="search-bar">
      <p class="name-of-section">{{ $t('rates.rates') }}</p>
      <img class="search-sign"  src="../../../assets/find-sign.svg" @click="changeSearchStatus"/>
    </div>
    <div class="search-bar" v-if="searchStatus">
        <input
            type="search"
            class="search-line"
            v-model="findByQuery"
        />
      <img class="cancel-sign" :src="closeSign" @click="deleteSearchQuery"/>
    </div>
    <div class="crypto-card-block">
      <no-information v-if="ratesList?.length <= 0"></no-information>
      <crypto-card
          class="crypto-card"
          v-for="(item, index) in findByQuery ? searchQuery : ratesList"
          :key="index"
          :item="item"
          :type="true"
      />
    </div>
  </div>
</template>

<script>
import cryptoCard from './CryptoCard.vue';
import noInformation from '../NoInformationPage/NoInformation.vue'
import { ref, computed } from 'vue';
import { useStore } from "vuex";
import closeSign  from '../../../assets/headerLogo/close-sign.svg';

export default {
  components: {
    cryptoCard,
    noInformation,
  },
  setup () {
    const store = useStore();
    const ratesList = computed(() => store.state.ratesList);
    const searchStatus = ref(false);
    const findByQuery = ref("");
    const searchQuery = computed(() => {
      return ratesList.value.filter((rate) => {
        return (
          rate.name
            .toLowerCase()
            .indexOf(findByQuery.value.toLowerCase()) !== -1
        );
      });
    });

    function deleteSearchQuery() {
      findByQuery.value = "";
    }

    function refreshRates() {
      chrome.runtime.sendMessage({ action: 'instantUpdateRates'}, (result) => {
        store.commit('update', {
          ratesList: result,
        })
      })
    }

    function changeSearchStatus() {
      searchStatus.value = !searchStatus.value;
    }

    return {
      ratesList,
      searchStatus,
      findByQuery,
      searchQuery,
      closeSign,
      refreshRates,
      changeSearchStatus,
      deleteSearchQuery,
    }
  }
}
</script>

<style scoped>

.crypto-info {
  display: inline-flex;
  width: 100%;
  margin-top: 10px;
  flex-direction: column;
}

.search-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.name-of-section {
  margin: 11px 16px;
  font-weight: 600;
  font-size: 24px;
  color: #FFFFFF;
  font-family: Gilroy, sans-serif;
}

.search-sign {
  cursor: pointer;
  width: 40px;
  height: 40px;
  margin-right: 16px;
  font-family: Gilroy, sans-serif;
}

.search-sign:hover {
  background: #7276FF;
  border-radius: 5px;
  transition: 0.5s;
}

.crypto-card-block {
  margin-top: 0;
  display: inline-flex;
  margin-left: 10px;
  flex-wrap: wrap;
}

.search-bar {
  transition: all 1s ease-in-out;
  color: white;
  position: relative;
}

.search-line {
  border-bottom: 1px solid #ACACAC;
  border-right: none;
  margin-left: 16px;
  width: 372px;
  background-color: inherit;
  padding-bottom: 5px;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #FFFFFF;
  font-family: Gilroy, sans-serif;
}

input:focus{outline:none;}

input[type="search"]::-webkit-search-cancel-button {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  color: #757575;
}

.cancel-sign {
  transition: 1s;
  position: absolute;
  height: 15px;
  width: 15px;
  cursor: pointer;
  left: 372px;
  bottom: 7px;
  color: #757575;
}

.cancel-sign:hover {
  background: #7276FF;
  border-radius: 5px;
}

</style>
