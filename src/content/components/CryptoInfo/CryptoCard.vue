<template>
  <div class="background-rates">
    <div class="coins-name">
     <div class="name-coin">
       {{ item.name }}
     </div>
      <div class="coin-fluctation">
        {{ $t('rates.last24') }}
        <font-awesome-icon v-if="!dayFluctation" :icon="['fas', 'arrow-down']"/>
        <font-awesome-icon v-else :icon="['fas', 'arrow-up']" />
        {{ item.downUpCoin }}%
      </div>
      <div class="coin-symbol">
        {{  item.symbol }}
      </div>
    </div>
    <div class="coins-info">
      <div class="coin-price">
        {{ $t('rates.price') }} {{ item.price }}
      </div>
      <div class="coin-dominance">
        {{ $t('rates.dominance') }} {{ item.dominance }}%
      </div>
    </div>
    <div class="coins-fluctation">
      {{ $t('rates.day7') }}
      <font-awesome-icon v-if="!weekFluctation" :icon="['fas', 'arrow-down']"/>
      <font-awesome-icon v-else :icon="['fas', 'arrow-up']" />
      {{ item.downUpCoins }}%
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

div {
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.background-rates {
  border: 2px solid orange;
  background: #333;
  margin: 10px 10px;
  color: white;
  height: 100px;
}

.coins-name, .coins-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.coins-info {
  padding-top: 5px;
}

.name-coin {
  padding-top: 12px;
  padding-left: 15px;
  font-size: 16px;
  text-decoration: underline;
  font-weight: bold;
}

.coin-symbol {
  font-size: 15px;
  font-style: italic;
  padding-right: 20px;
  padding-top: 12px;
}

.coin-price {
  padding: 8px 0 0 15px;
  font-size: 16px;
}

.coin-dominance {
  font-size: 14px;
  padding: 7px 20px 0 0;
}

.coin-fluctation {
  font-size: 15px;
}

.coins-fluctation {
  padding-left: 15px;
}

svg {
  font-size: 5px;
  height: 14px;
  color: orange;
  padding-left: 4px;
  padding-top: 12px;
}

</style>