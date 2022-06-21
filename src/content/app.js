import { createApp } from 'vue';
import store from '../utilities/config';
import App from './App.vue';
import { createI18n } from 'vue-i18n'

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { messages } from '../utilities/messages';

library.add(fas);
library.add(fab);


class Crypto {
  constructor() {
    this.setEvents();
    this.createContent();
    this.addRates();
    this.addNews();
  }

  setEvents() {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action && typeof this[request.action] === 'function') {
        this[request.action]({ request, sender, sendResponse });
      }
      return true;
    });
  }

  createShadowRoot() {
    const wrapper = document.createElement('div');
    wrapper.className = 'crypto-info';
    document.body.append(wrapper);
    const shadowRoot = wrapper.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = `
      <script type="module" :src="https://unpkg.com/ionicons@5.0.0/dist/ionicons/ionicons.esm.js"></script>
      <style>@import url("${global.chrome.extension.getURL('content/styles.css')}");</style>
      <div id='app'></div>`;
    return shadowRoot;
  }

  toggleSlider() {
    store.dispatch('toggleApp');
  }

  addRates() {
    chrome.runtime.sendMessage({action: 'getRatesData'}, (result) => {
      store.commit('set', {
        ratesList: result,
      })
    })
  }

  addNews() {
    chrome.runtime.sendMessage({action: 'getNewsData'}, (result) => {
      store.commit('set',{
        newsList: result.articles,
      })
    })
  }

  multiFunkContent({ request }) {
    const { contentAction } = request;
    let backAction = contentAction === 'updateData' ? 'updateNotes' : 'getNotes'
    let storeAction = contentAction === 'updateData' ? 'update' : 'set';
    chrome.runtime.sendMessage({action: backAction}, (result) => {
      store.commit(storeAction,{
        cryptoNotes: result,
      })
    })
  }

  createContent() {
    const app = this.createShadowRoot().querySelector('#app') || '#app'
    this.content = createApp(App)
        .use(store)
        .use(createI18n({
          locale: 'en',
          fallbackLocale: 'en',
          messages
    })).component('FontAwesomeIcon', FontAwesomeIcon).mount(app);
  }
}

window.cryptoInfoContent = new Crypto();