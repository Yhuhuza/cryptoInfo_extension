<template>
  <div class="settings">
    <div class="set-settings">
      <h4 class="set-languages">{{ $t('settings.lang') }}</h4>
      <div class="set-lang">
        <a href="#" @click="changeLang('ru')">Русский</a>
        <a href="#" @click="changeLang('en')">English</a>
        <a href="#" @click="changeLang('ch')">中国人</a>
      </div>
    </div>
  </div>
</template>

<script>
import { useI18n } from "vue-i18n";

export default {
  setup() {
    const { locale } = useI18n();

    function changeLang(lang) {
      locale.value = lang;
    }

    return {
      changeLang,
    }
  },
}


</script>

<style scoped>

.settings {
  margin: 20px;
  height: 374px;
}
.set-settings {
  text-align: center;
}

.set-languages {
  color: white;
  font-size: 16px;
  align-items: center;
  font-family: Gilroy, sans-serif;
}

.set-lang {
  display: flex;
  flex-direction: column;
  align-items: center;
}

a {
  text-decoration: none;
  color: white;
  height: 25px;
  font-family: Gilroy, sans-serif;
}

a:hover {
  color: orange;
}

</style>
