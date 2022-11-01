<template>
  <div class="background-rates">
    <div class="coin-info">
      <img class="coin-logo" src="../../../assets/coin-prototype.svg" />
      <div class="coin-name">{{ item.name }}</div>
    </div>
    <div class="coin-price">{{ item.price }}$</div>
    <div class="day-fluctation">
      <img v-if="!weekFluctation" src="../../../assets/arrow-down.svg" />
      <img v-else src="../../../assets/arrow-up.svg" />
      {{ $t('rates.last24') }} {{ item.downUpCoin }}%
    </div>
    <div class="seven-day-fluctation">
      <img v-if="!weekFluctation" src="../../../assets/arrow-down.svg" />
      <img v-else src="../../../assets/arrow-up.svg" />
      {{ $t('rates.day7') }} {{ item.downUpCoins }}%
    </div>
    <div class="coin-dominance">
      {{ $t('rates.dominance') }} {{ item.dominance }}%
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  props: {
    item: {
      type: Object,
      default: () => ({}),
    }
  },
  setup(props) {
    const dayFluctation = computed(() => props.item.downUpCoin > 0);
    const weekFluctation = computed(() => props.item.downUpCoins > 0);

    return {
     dayFluctation,
      weekFluctation,
    }
  },
}
</script>

<style scoped>

.background-rates {
  margin-right: 10px;
  margin-bottom: 10px;
  color: white;
  height: 175px;
  width: 185px;
  background-color: #2A2C31;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10px);
  border-radius: 10px;
}

.coin-info {
  margin: 20px 0 8px 16px;
  display: flex;
  flex-direction: row;
  align-content: center;
}

.coin-logo {
  display: inline-block;
  height: 18px;
  width: 18px;
  margin-right: 8px;
}

.coin-name {
  display: inline-block;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  font-family: Gilroy, sans-serif;
}

.coin-price {
  margin-left: 16px;
  margin-bottom: 20px;
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 26px;
  font-family: Gilroy, sans-serif;
}

.seven-day-fluctation, .day-fluctation {
  display: flex;
  align-items: center;
  margin-left: 16px;
  margin-bottom: 6px;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  font-family: Gilroy, sans-serif;
}

.seven-day-fluctation img, .day-fluctation img{
  margin-right: 5px;
}

.coin-dominance {
  margin: 11px 13px 0 16px;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  font-family: Gilroy, sans-serif;
}
</style>
