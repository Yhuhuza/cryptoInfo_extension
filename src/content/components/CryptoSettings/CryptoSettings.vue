<template>
  <div class="settings">
    <div class="set-settings">
      <h4 class="set-languages">{{ $t('settings.lang') }}</h4>
      <div class="set-lang">
        <a href="#" @click="changeLanguage('ru')">Русский</a>
        <a href="#" @click="changeLanguage('en')">English</a>
        <a href="#" @click="changeLanguage('ch')">中国人</a>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  methods: {
    changeLanguage(locale) {
      this.$i18n.locale = locale;
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
}

.set-lang {
  display: flex;
  flex-direction: column;
  align-items: center;
}

a {
  text-decoration: none;
  color: white;
  height: 25px
}

a:hover {
  color: orange;
}

</style>