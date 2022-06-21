import {
  CRYPTO_RATES_API,
  CRYPTO_URL,
  UPDATE_RATES,
} from '../utilities/constants';
import {extractCoins, parseCoinsValues} from "@/utilities/parser";


export class CryptoRates {
  constructor() {
    this.data = null;
    this.interval = null;
    this.fetchRates();
  }

  fetchRates() {
    return fetch (CRYPTO_URL, {
      method: 'GET',
      headers: {
        'X-CMC_PRO_API_KEY': CRYPTO_RATES_API
      }
    }).then((response) => response.json())
        .then(data => {
          if (data) {
            const extractedCoins = extractCoins(data.data);
            this.data = extractedCoins.map(parseCoinsValues);
            const rates = {};
            rates['crypto_rates'] = this.data;
            chrome.storage.local.set(rates);
            this.updateRates();
          } else {
            this.data = chrome.storage.local.get(['crypto_rates']);
            chrome.tabs.query({}, (tabs) =>
                tabs.forEach( tab => chrome.tabs.sendMessage(tab.id, {
                  action: 'addRates'
                })));
            clearInterval(this.interval);
            setTimeout(() => this.fetchRates(), 60000);
          }
       });
  }

  updateRates() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.interval = setInterval(() => {
      this.fetchRates().then(()=>{console.log('updatedRates')}
      )
    }, UPDATE_RATES);
  }

}


