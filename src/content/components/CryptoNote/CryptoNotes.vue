<template>
  <div>
    <div class="note-pattern">
      <div class="note-editing">
        <font-awesome-icon class="edit-note" @click="editNote" :icon="['fas', 'pen']"></font-awesome-icon>
        <font-awesome-icon class="delete-note" @click="deleteNote(item.id)" :icon="['fas', 'trash-can']"></font-awesome-icon>
      </div>
      <div>
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
  margin: 0 30px 10px;
  width: 300px;
  padding: 5px;
  border: 2px solid orange;
  border-radius: 5px;
}

.note-title {
  display: flex;
  justify-content: center;
  margin: 0 0 20px;
  font-size: 20px;
}

.note-description {
  margin: 0 20px;
  font-size: 14px;
  overflow: hidden;
  overflow-wrap: break-word;
  text-align: center;
}

.note-editing {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 10px 0;
}

svg {
  height: 20px;
}

svg:hover {
  color: orange;
  transform: scale(1.2);
  transition: 0.5s;
  cursor: pointer;
}

</style>