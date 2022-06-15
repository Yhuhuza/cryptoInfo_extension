<template>
  <div class="crypto-note">
    <div class="note-buttons">
      <font-awesome-icon class="add-note" @click="changeTab(pages.add)" :icon="['fas', 'plus']"></font-awesome-icon>
      <font-awesome-icon class="add-note" @click="updateNotes" :icon="['fas', 'arrow-rotate-right']"></font-awesome-icon>
    </div>
    <crypto-notes
        class="crypto-note-card"
        v-for="(item, index) in cryptoNotes"
        :key="index"
        :item="item"
        :type="true"
    ></crypto-notes>
  </div>
</template>

<script>
import CryptoNotes from './CryptoNotes.vue';
import { mapState } from 'vuex';
import { PAGES } from '../../../utilities/constants';
import { changeTab } from "@/utilities/mixins";

export default {
  components: {
    CryptoNotes,
  },
  data() {
    return {
      pages: PAGES,
    }
  },
  mixins: [
    changeTab,
  ],
  methods: {
    updateNotes() {
      this.$store.commit('update', {
        cryptoNotes: null,
      });
      chrome.runtime.sendMessage({
        action: 'multiFunc',
        data: {
          act: 'fetchNotes',
          storeAct: 'setNote',
        }
      });
    },
  },
  mounted() {
    this.updateNotes()
  },
  computed: {
  ...mapState([
      'cryptoNotes',
      'page',
    ]),
  },
}
</script>

<style scoped>

.crypto-note {
  padding: 5px 10px 0;
  font-family: 'Roboto', serif;
}
.note-buttons {
  display: flex;
  flex-direction: row;
  width: 320px;
  justify-content: space-between;
  margin: 5px 0 20px 26px;
}

svg {
  width: 50px;
  height: 50px;
  border-radius: 50px;
  color: #00FFFF;
  cursor: pointer;
}

svg:hover {
  color: white;
}

</style>