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
import { mapState } from 'vuex';
import { PAGES } from '@/utilities/constants';
import { changeTab } from "@/utilities/mixins";

export default {
  methods: {
    submitData() {
      if (!this.checkFields) {
        chrome.runtime.sendMessage({
          action: 'multiFunc',
          data: {
            id: this?.idNote,
            title: this.noteTitle,
            description: this.noteDescription,
            act: this.idNote ? 'editNote' : 'submitNote',
            storeAct: this.idNote ? 'editNote' : 'submitNote',
          }
        });
        if (this.idNote) this.changeTab(this.pages.notes);
        this.updateData();
      } else {
        this.showError()
      }
      this.clearFields();
    },
    clearFields() {
      this.noteDescription = '';
      this.noteTitle = '';
    },
    showError() {
      this.errorMessage = true;
      setTimeout(() => this.errorMessage = false, 2000);
    },
    changeTab(page) {
      this.$store.commit('update', {
        editNote: null,
        page: page
      });
    },
    updateData() {
      chrome.runtime.sendMessage({ action: 'updateNotes'}, (notes) => {
        this.$store.commit('update', {
          cryptoNotes: notes
        })
      });
    }
  },
  data() {
    return {
      noteTitle: '',
      noteDescription: '',
      pages: PAGES,
      errorMessage: false,
      idNote: this.$store.state.editNote,
      currentItem: null,
    }
  },
  ...mapState([
    'page',
    'cryptoNotes',
    'editNote',
  ]),
  mixins: [
    changeTab,
  ],
  mounted() {
    const { editNote, cryptoNotes } = this.$store.state;
    if (editNote) {
      this.currentItem = cryptoNotes.find(item => item.id === editNote);
      this.noteTitle = this.currentItem.title;
      this.noteDescription = this.currentItem.description;
    }
  },
  computed: {
    checkFields() {
      return ((this.noteDescription === '') && (this.noteTitle === ''));
    },
    buttonType() {
      return this.idNote
        ? `${this.$t('notes.editNote')}`
        : `${this.$t('notes.submitNote')}`
    },
  }
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