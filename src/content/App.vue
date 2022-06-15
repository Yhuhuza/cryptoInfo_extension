<template>
  <main-menu id="crypto-info" v-if="showApp"></main-menu>
</template>

<script>
import { mapState } from 'vuex';
import MainMenu from './components/MainMenu/MainMenu.vue'

export default {
  computed:{
  ...mapState([
     'showApp'
    ])
  },
  components: {
    MainMenu,
  }
}
</script>

<style>
#crypto-info {
  /*font-family: Roboto;*/
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 999999999999999999999;
}
</style>
