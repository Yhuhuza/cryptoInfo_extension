<template>
  <div class="crypto-note">
    <div class="notes-title">
      {{ $t('footer.notes') }}
    </div>
    <crypto-notes
        class="crypto-note-card"
        v-for="(item, index) in cryptoNotes"
        :key="index"
        :item="item"
        :type="true"
    ></crypto-notes>
    <div class="note-buttons">
      <button class="add-note" @click="changeTab(pages.add)">{{ $t('notes.addNote') }}</button>
      <button class="update-note" @click="updateNotes">{{ $t('notes.updateNote') }}</button>
    </div>
  </div>
</template>

<script>
import CryptoNotes from './CryptoNotes.vue';
import { useStore } from 'vuex';
import { PAGES } from '../../../utilities/constants';
import { computed, onMounted } from 'vue';

export default {
  components: {
    CryptoNotes,
  },
  setup() {
    const store = useStore();
    const cryptoNotes = computed(() => store.state.cryptoNotes);
    const page = computed(() => store.state.page);

    function updateNotes() {
      store.commit('update', {
        cryptoNotes: null,
      });
      chrome.runtime.sendMessage({
        action: 'multiFunc',
        data: {
          act: 'fetchNotes',
          storeAct: 'setNote',
        }
      });
    }

    function changeTab(page) {
      store.commit('update', {
        page: page
      });
    }

    onMounted(() => {
      updateNotes();
    })

    return {
      pages: PAGES,
      updateNotes,
      changeTab,
      cryptoNotes,
      page,
    }
  },
}
</script>

<style scoped>

.crypto-note {
  padding: 5px 10px 0;
  font-family: 'Roboto', serif;
}

.notes-title {
  margin-top: 18px;
  margin-left: 16px;
  margin-bottom: 20px;
  font-family: 'Gilroy', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  color: #FFFFFF;
}

.note-buttons {
  display: flex;
  position: relative;
  top: 325px;
  flex-direction: row;
  justify-content: space-around;
}

.add-note, .update-note {
  width: 180px;
  height: 45px;
  border-radius: 5px;
  border: none;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;
  font-family: 'Gilroy', sans-serif;
  color: #FFFFFF;
  padding-left: 70px;
  cursor: pointer;
}

.add-note {
  background: #7276FF;
  margin-right: 10px;
  position: relative;
}

.add-note::before {
  content: url("../../../assets/add-note.svg");
  width: 16px;
  height: 16px;
  display: block;
  position: absolute;
}

.update-note {
  background: inherit;
  border: 1px solid #7276FF;
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
