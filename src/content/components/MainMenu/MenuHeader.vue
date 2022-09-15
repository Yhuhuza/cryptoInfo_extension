<template>
  <div class="menu-header">
    <div class="language-switcher">
      <div class="languages-list">EN</div>
    </div>
    <img class="header-logo" alt="#" :src="imageLogo" />
    <img class="closing-sign" alt="#" :src="closeSign" />
  </div>
</template>

<script>
import imageLogo  from '../../../assets/headerLogo/main-logo.svg';
import closeSign  from '../../../assets/headerLogo/close-sign.svg';

export default {
  setup() {
    return {
      imageLogo,
      closeSign,
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
  height: 100%;
  width: 33%;
}

.languages-list {
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
</style>
