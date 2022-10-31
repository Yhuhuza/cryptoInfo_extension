import { USING_COINS } from '../utilities/constants';

const extractCoins = (value) => {
  let usableCoins = [];
  value?.forEach((item, i, something) => {
    if (USING_COINS.includes(item.name)) {
      usableCoins.push(item);
    }
  })
  return usableCoins;
}

const parseNotes = (data) => {
  const keyData = Object.keys(data);
  const valuesData = Object.values(data);
  valuesData.forEach((item, i, something) => {
    item['id'] = keyData[i];
  })
  return valuesData;
}

const parseCoinsValues = (item) => ({
  name: item.name,
  symbol: item.symbol,
  downUpCoin: item.quote.USD.percent_change_24h.toFixed(1),
  price: item.quote.USD.price.toFixed(1),
  volumeChangeDay: item.quote.USD.volume_change_24h.toFixed(1),
  downUpCoins: item.quote.USD.percent_change_7d.toFixed(1),
  dominance: item.quote.USD.market_cap_dominance.toFixed(1),
})


const dateFormat = (date) => {
  let extractedDate = date.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}/g);
  extractedDate = extractedDate[0].replace('T', ' ');
  return extractedDate;
}


export  {
  extractCoins,
    parseCoinsValues,
    dateFormat,
    parseNotes,
}
