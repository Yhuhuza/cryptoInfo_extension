<template>
  <div class="add-note">
    <div v-if="errorMessage" class="error-note">
      <div class="note-error">
        {{ $t('notes.warning') }}
      </div>
    </div>
    <div class="wrapper-header">
      <img class="back-sign" @click="changeTab(pages.notes)" src="../../../assets/left-arrow.svg" alt="#" />
      <h3 class="title-note">{{ $t('notes.note') }}</h3>
    </div>
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
      setTimeout(() => errorMessage.value = false, 3000);
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
  position: relative;
}

.wrapper-header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  align-content: center;
  margin-bottom: 40px;
}

.notes-buttons {
  display: flex;
  margin-top: 90px;
  align-content: center;
  align-items: center;
  justify-content: space-around;
  margin-left: -8px;
}

.submit-button, .update-button {
  font-family: 'Gilroy', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  width: 180px;
  height: 45px;
  color: #FFFFFF;
  border: 1px solid #7276FF;
  border-radius: 5px;
  background: #7276FF;
  cursor: pointer;
}

.update-button {
  background: inherit;
}

.title-note {
  color: white;
  font-family: 'Roboto',serif;
  font-size: 24px;
  padding: 0 160px;
  margin: 8px -22px;
}

.note-title {
  height: 40px;
  width: 325px;
  margin-left: 20px;
  margin-bottom: 20px;
  border-radius: 6px;
  border: 1px solid #7276FF;
  padding-left: 10px;
  background: inherit;
  color: #FFFFFF;
  font-size: 16px;
}

.input-field {
  border: 1px solid #7276FF;
  display: block;
  height: 140px;
  width: 320px;
  font-size: 16px;
  padding: 10px;
  resize: none;
  margin-bottom: 20px;
  margin-left: 20px;
  border-radius: 6px;
  background: inherit;
  color: #FFFFFF;
}

.note-error {
  position: absolute;
  top: 315px;
  left: 42px;
  color: #FFFFFF;
  background-color: #7276FF;
  border-radius: 6px;
  font-size: 20px;
  height: 80px;
  width: 300px;
  display: flex;
  align-items: center;
}

</style>
