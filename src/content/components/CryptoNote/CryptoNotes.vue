<template>
  <div>
    <div class="note-pattern">
      <div class="note-editing">
        <img src="../../../assets/trash-sign.svg" alt="#" class="edit-note" @click="deleteNote(item.id)"/>
        <img src="../../../assets/edit-note-sign.svg" alt="#" class="delete-note" @click="editNote" />
      </div>
      <div class="card-wrapper">
        <h3 class="note-title">{{ item.title }}</h3>
        <p class="note-description">{{ item.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { PAGES } from '../../../utilities/constants';
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  props: {
    item: {
      type: Object,
      default: () => ({}),
    }
  },
  setup(props) {
    const store = useStore();
    let noteDescription = props.item.noteDescription;
    let noteTitle = props.item.noteTitle;

    const cryptoNotes = computed(() => store.state.cryptoNotes);
    const checkForDisplay = computed(() => noteTitle && noteDescription);

    function deleteNote(note) {
      chrome.runtime.sendMessage({
        action: 'multiFunc',
        data: {
          note,
          act: 'deleteNote',
          storeAct: 'getNote',
        }
      });
    }

    function editNote() {
      store.commit('set', {
          editNote:  props.item.id
      });
      changeTab(PAGES.add);
    }

    function changeTab(page) {
      store.commit('update', {
        page: page,
      });
    }

    return {
      pages: PAGES,
      noteTitle,
      noteDescription,
      cryptoNotes,
      checkForDisplay,
      deleteNote,
      editNote,
    }
  },
}
</script>

<style scoped>

.note-pattern {
  color: white;
  margin: 0 16px 10px 16px;
  width: 315px;
  height: 115px;
  padding: 0 16px;
  border: none;
  background: rgba(244, 235, 255, 0.05);
  border-radius: 5px;
  position: relative;
}

.card-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.note-title {
  display: flex;
  justify-content: center;
  margin: 0 0 8px;
  font-size: 20px;
}

.note-description {
  margin: 0;
  font-size: 14px;
  overflow: hidden;
  overflow-wrap: break-word;
  text-align: center;
}

.note-editing {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  position: relative;
  top: 14px;
}

.delete-note, .edit-note {
  cursor: pointer;
}

.delete-note:hover, .edit-note:hover {
  background-color: #7276FF;
  transform: scale(1.1);
  border-radius: 5px;
  transition: ease 1s;
}
</style>
