import { CryptoRates } from './collections/cryptoRates.js';
import { CryptoNews } from './collections/cryptoNews.js';
import { CryptoNote } from './collections/cryptoNote';

class Crypto {
  constructor() {
    this.crypto = new CryptoRates;
    this.news = new CryptoNews;
    this.note = new CryptoNote;
    this.setEvents();
  }

  getRatesData({ request, sender, sendResponse }) {
    sendResponse(this.crypto.data);
  }

  getNewsData({ request, sender, sendResponse }) {
    sendResponse(this.news.data);
  }

  getNotes({ sendResponse }) {
    sendResponse(this.note.notes);
  }

  parseRates(data) {
    const json = JSON.parse(data);
    if (!json.stores) return [];
    return json;
  }

  instantUpdateRates({ sendResponse }) {
    this.crypto.fetchRates().then(() => {
      sendResponse(this.crypto.data);
    });
  }

  setEvents(){
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request && typeof this[request.action] === 'function') {
        this[request.action]({ request, sender, sendResponse });
      }
      return true;
    });
    chrome.browserAction.onClicked.addListener(async (tab) => {
      chrome.tabs.sendMessage(tab.id, {
        action: 'toggleSlider',
      });
    });
  }

  async multiFunc({ request, sender, sendResponse }) {
    const { data } = request;
    let requestAct = data.act;
    let storeAct = data.storeAct;
    switch(requestAct) {
      case 'submitNote':
        await this.note[requestAct]({ request });
        break;
      case 'editNote':
        await this.note[requestAct]({ request });
        break;
      case 'fetchNotes':
        await this.note[requestAct]();
        break;
      case 'deleteNote':
        this.note[requestAct]({request});
        break;
    }
    chrome.tabs.query({}, function(tabs) {
      for (let i = 0; i < tabs.length; ++i) {
        chrome.tabs.sendMessage(tabs[i].id, {
          action: 'multiFunkContent',
          contentAction: storeAct,
        });
      }
    });
  }
}

window.crypto = new Crypto();

Object.defineProperty(window, 'crypto', {
  value: crypto
});