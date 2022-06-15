import { createStore } from 'vuex';
import { assign, merge } from 'lodash';
import { PAGES } from '../utilities/constants';

const store = createStore({
  state() {
    return {
      showApp: false,
      ratesList: [],
      page: PAGES.info,
      newsList: [],
      cryptoNotes: [],
      editNote: null,
    }
  },
  mutations: {
    set(state, data) {
      assign(state, data);
    },
    update(state, data) {
      merge(state, data);
    }
  },
  actions: {
    toggleApp() {
      store.state.showApp = !store.state.showApp;
    }
  }
})

export default store;