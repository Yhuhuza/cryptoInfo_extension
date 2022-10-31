<template>
  <div class="crypto-note">
    <div class="notes-title">
      {{ $t('footer.notes') }}
    </div>
    <div class="wrapper-cards">
      <crypto-notes
        class="crypto-note-card"
        v-for="(item, index) in cryptoNotes"
        :key="index"
        :item="item"
        :type="true"
      ></crypto-notes>
    </div>
    <div class="notes">
      <div class="wrapper-add">
        <button class="add-note" @click="changeTab(pages.add)">
          <img class="add-sign" src="../../../assets/add-note.svg"  alt="#"/>
          {{ $t('notes.addNote') }}
        </button>
      </div>
      <div class="wrapper-update">
        <button class="update-note" @click="updateNotes">
          <img class="update-sign" src="../../../assets/update-note.svg"  alt="#"/>
          {{ $t('notes.updateNote') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import CryptoNotes from './CryptoNotes.vue';
import { useStore } from 'vuex';
import { PAGES } from '@/utilities/constants';
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
.wrapper-cards {
  height: 300px;
  overflow: scroll;
  margin-bottom: 20px;
}

.notes {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 10px;
  margin-bottom: 20px;
  position: static;
  top: 215px;
}

.add-note, .update-note {
  width: 180px;
  height: 45px;
  border-radius: 5px;
  border: none;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Gilroy', sans-serif;
  color: #FFFFFF;
  cursor: pointer;
}

.add-note {
  background: #7276FF;
  margin-right: 10px;
}

.update-note {
  background: inherit;
  border: 1px solid #7276FF;
}

img {
  margin-right: 5px;
}

::-webkit-scrollbar {
  display: none;
}

</style>
