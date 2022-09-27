<template>
  <div class="main-footer">
    <div class="footer-navigation">
      <ul class="list-icons">
        <li class="list" @click="changeTab(pages.info)">
          <img
            class="list-rates"
            alt="#"
            src="../../../assets/footerLogo/rates-sign.svg"
            :class = "{ active : page === 'CryptoInfo' }"
          />
        </li>
        <li class="list" @click="changeTab(pages.news)">
          <img
            class="list-news"
            alt="#"
            src="../../../assets/footerLogo/news-sign.svg"
            :class = "{ active : page === 'CryptoNews' }"
          />
        </li>
        <li class="list"  @click="changeTab(pages.notes)">
          <img
            class="list-note"
            alt="#"
            src="../../../assets/footerLogo/note-sign.svg"
            :class = "{ active : page === 'CryptoNote' }"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { PAGES } from "@/utilities/constants";
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const page = computed(() => store.state.page);

    function changeTab(page) {
      store.commit('update', {
        page: page,
      });
    }

    return {
      pages: PAGES,
      page,
      changeTab,
    }
  },
}
</script>

<style scoped>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Ubuntu', sans-serif;
}

.main-footer {
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  background: #1F2125;
  height: 64px;
}

.list-icons{
  padding: 8px 68px 0 68px;
  display: flex;
  justify-content: space-between;
}

.list-rates, .list-news, .list-note {
  height: 48px;
  width: 48px;
}

.list-rates:hover, .list-news:hover, .list-note:hover {
  border-radius: 5px;
  transition: 0.5s;
  background-color: #7276FF;
  cursor: pointer;
}

.active {
  border-radius: 5px;
  transition: 0.5s;
  background-color: #7276FF;
}


</style>
