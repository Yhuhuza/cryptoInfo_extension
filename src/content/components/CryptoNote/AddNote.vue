<template>
  <div class="add-note">
    <div v-if="errorMessage" class="error-note">
      <div class="note-error">
        {{ $t('notes.warning') }}
      </div>
    </div>
    <font-awesome-icon class="back-note" @click="changeTab(pages.notes)" :icon="['fas', 'arrow-left']"></font-awesome-icon>
    <h3 class="title-note">{{ $t('notes.note') }}</h3>
      <input  class="note-title" name="titleNote" :placeholder="$t('notes.placeTitle')" v-model.trim="noteTitle"/>
      <textarea :placeholder="$t('notes.placeType')" class="input-field" v-model.trim="noteDescription"></textarea>
      <div  class="notes-buttons">
        <button class="submit-button" @click="submitData">{{ buttonType }}</button>
        <button class="update-button" @click="clearFields">{{ $t('notes.clearFields') }}</button>
      </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { PAGES } from '@/utilities/constants';
import { ref, computed, onMounted } from "vue";
import { useI18n } from 'vue-i18n';

export default {
  setup() {
    const store = useStore();
    const { t } = useI18n();

    const noteTitle = ref('');
    const noteDescription = ref('');
    const errorMessage = ref(false);
    const currentItem = ref(null);

    const idNote = computed(() => store.state.editNote);
    const page = computed(() => store.state.page);
    const cryptoNotes = computed(() => store.state.cryptoNotes);
    const editNote = computed(() => store.state.editNote);
    const isEmptyFields = computed(() => noteDescription.value === '' && noteTitle.value === '');
    const buttonType = computed(() => {
      return idNote.value
        ? `${t('notes.editNote')}`
        : `${t('notes.submitNote')}`;
    })

    onMounted(() => {
      const { editNote, cryptoNotes } = store.state;
      if (editNote) {
        currentItem.value = cryptoNotes.find(item => item.id === editNote);
        noteTitle.value = currentItem.value.title;
        noteDescription.value = currentItem.value.description;
      }
    })

    function updateData() {
      chrome.runtime.sendMessage({ action: 'updateNotes'}, (notes) => {
        store.commit('update', {
          cryptoNotes: notes
        })
      });
    }

    function changeTab(page) {
      store.commit('update', {
        page: page
      });
    }

    function clearFields() {
      noteDescription.value = '';
      noteTitle.value = '';
    }

    function showError() {
      errorMessage.value = true;
      setTimeout(() => errorMessage.value = false, 2000);
    }

    function submitData() {
      if (!isEmptyFields.value) {
        chrome.runtime.sendMessage({
          action: 'multiFunc',
          data: {
            id: idNote?.value,
            title: noteTitle.value,
            description: noteDescription.value,
            act: idNote.value ? 'editNote' : 'submitNote',
            storeAct: 'getNote',
          }
        });
        if (idNote) changeTab(PAGES.notes);
        updateData();
        clearFields();
      } else {
        showError()
      }
    }

    return {
      noteTitle,
      noteDescription,
      pages: PAGES,
      errorMessage,
      buttonType,
      editNote,
      cryptoNotes,
      page,
      submitData,
      clearFields,
      changeTab,
    }
  },
}
</script>

<style scoped>

.add-note {
  margin-left: 7px;
}

.title-note {
  color: white;
  font-family: 'Roboto',serif;
  font-size: 24px;
  padding: 0 160px;
  margin: 8px 0;
}

.note-title {
  height: 25px;
  width: 220px;
  border-radius: 10px;
  border: 2px solid orange;
  padding-left: 5px;
  margin: 0 75px 15px;
}

.input-field {
  border: 1px solid orange;
  display: block;
  margin: 0 20px;
  height: 135px;
  width: 318px;
  font-size: 14px;
  padding: 10px;
  resize: none;
  margin-bottom: 20px;
  border-radius: 15px;
}

.notes-buttons {
  display: flex;
  margin: 0 20px;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 10px;
  margin-bottom: 20px;
}

.submit-button, .update-button, .edit-button {
  display: block;
  text-decoration: none;
  font-size: 16px;
  border: 2px solid orange;
  background: #333;
  width: 120px;
  height: 35px;
  color: white;
  cursor: pointer;
  border-radius: 10px;
}

svg {
  height: 50px;
  color: orange;
  margin: 15px 10px 0 165px;
  cursor: pointer;
}

svg:hover {
  color: #00FFFF;
  scale: 1.5;
}

.note-error {
  position: absolute;
  top: 89px;
  left: 50px;
  border: 2px solid orange;
  color: white;
  background-color: #333;
  font-size: 28px;
  height: 80px;
  width: 300px;
  text-align: center;
  display: flex;
  align-items: center;
}

</style>
