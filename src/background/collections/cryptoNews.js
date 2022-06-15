import { CRYPTO_NEWS } from "@/background/utilities/constants";
import { UPDATE_NEWS } from '@/background/utilities/constants';

export class CryptoNews {
  constructor() {
    this.data = null;
    this.interval = null;
    this.fetchNews();
  }

  fetchNews() {
    return fetch(CRYPTO_NEWS)
        .then((response) => response.json())
        .then(data => {
          if (data) {
            this.data = data;
            const news = {};
            news['crypto_news'] = this.data;
            chrome.storage.local.set(news);
            this.updateNews()
          } else {
              this.data = chrome.storage.local.get(['crypto_news']);
              chrome.tabs.query({}, (tabs) =>
                  tabs.forEach(tab => chrome.tabs.sendMessage(tab.id, {
                    action: 'addNews'
                  })));
              clearInterval(this.interval);
              setTimeout(() => this.fetchNews(), 1000 * 60 * 60);
          }
        });
  }

  updateNews() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.interval = setInterval(() => {
      this.fetchNews().then(() => {console.log('updatedNews')})
    }, UPDATE_NEWS);
  }

}