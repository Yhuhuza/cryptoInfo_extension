<template>
  <div class="main-menu">
    <menu-header></menu-header>
    <main-body></main-body>
    <footer-navigation></footer-navigation>
  </div>
</template>

<script>
import MenuHeader from './MenuHeader.vue'
import FooterNavigation from './FooterNavigation.vue';
import MainBody from './MainBody.vue';

export default {
  components: {
    FooterNavigation,
    MainBody,
    MenuHeader,
  }
}
</script>

<style scoped>

.main-menu {
  display: flex;
  flex-direction: column;
  height: 550px;
  width: 400px;
  border-radius: 30px;
}


</style>