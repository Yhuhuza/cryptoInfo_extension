<template>
  <div class="menu-header">
    <div class="language-switcher">
      <div class="languages-list" @click="openCloseLanguages(true)">{{ choseLanguage }}</div>
      <div class="set-settings" v-if="hover">
        <div class="set-lang">
          <a href="#" @click="changeLang('ru')">Русский</a>
          <a href="#" @click="changeLang('en')">English</a>
          <a href="#" @click="changeLang('ch')">中国人</a>
          <img class="closing-language-sign" alt="#" :src="closeSign" @click="openCloseLanguages(false)"/>
        </div>
      </div>
    </div>
    <img class="header-logo" alt="#" :src="imageLogo" />
    <img class="closing-sign" alt="#" :src="closeSign" @click="closeExtension"/>
  </div>
</template>

<script>
import imageLogo  from '../../../assets/headerLogo/main-logo.svg';
import closeSign  from '../../../assets/headerLogo/close-sign.svg';
import { computed, onMounted } from 'vue';
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useI18n } from "vue-i18n";

export default {
  setup() {
    const store = useStore();
    const { locale } = useI18n();
    const hover = ref(false);

    const choseLanguage = computed(() => {
      const language = locale.value
      if (language === 'ch') return 'CH';
      if (language === 'ru') return 'RU';
      return 'EN';
    })

    onMounted(() => {

    })

    function changeLang(lang) {
      locale.value = lang;
      hover.value = false;
    }

    function openCloseLanguages(argument) {
      hover.value = !!argument;
    }

    function closeExtension() {
      store.commit('update', {
        showApp: false,
      })
    }



    return {
      imageLogo,
      closeSign,
      hover,
      choseLanguage,
      closeExtension,
      changeLang,
      openCloseLanguages,
    }
  },
}
</script>

<style scoped>
@font-face {
  font-family: Gilroy;
  src: url('../../../assets/fonts/Gilroy-Regular.ttf') format("truetype");
}

.menu-header {
  display: flex;
  box-sizing: border-box;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  height: 60px;
  background: #1F2125;
}

.language-switcher {
  position: relative;
  height: 100%;
  width: 33%;
}

.languages-list {
  cursor: pointer;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  color: #FFFFFF;
  margin-top: 20px;
  margin-left: 16px;
}

.header-logo, .closing-sign {
  width: 120px;
  height: 30px;
  margin-top: 15px;
}

.closing-sign {
  width: 30px;
  margin-left: 100px;
  cursor: pointer;
}

a {
  text-decoration: none;
  color: white;
  font-size: 18px;
}

a:hover {
  color: #7276FF;
  text-decoration: underline;
}

.set-settings {
  position: absolute;
  width: 398px;
  top: 58px;
  height: 55px;
  border-top: 1.5px solid  #7276FF;
  transition: 0.5s;
}

.set-lang {
  display: flex;
  padding: 20px;
  align-items: center;
  justify-content: space-between;
  z-index: 66;
  background: #202122;
}

.closing-language-sign {
  transition: 1s;
  position: absolute;
  height: 15px;
  width: 15px;
  cursor: pointer;
  left: 378px;
  bottom: 36px;
}

.closing-language-sign:hover {
  background: #7276FF;
}
</style>
