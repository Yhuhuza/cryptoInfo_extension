<template>
  <div class="main-footer">
    <div class="footer-navigation">
      <ul>
        <li class="list" @click="changeTab(pages.info)">
          <a href="#">
            <span class="icon">
              <font-awesome-icon :icon="['fas', 'coins']"></font-awesome-icon>
            </span>
            <span class="text">{{ $t('footer.rates') }}</span>
          </a>
        </li>
        <li class="list" @click="changeTab(pages.news)">
          <a href="#">
            <span class="icon">
              <font-awesome-icon :icon="['fas', 'newspaper']"></font-awesome-icon>
            </span>
            <span class="text">{{ $t('footer.news') }}</span>
          </a>
        </li>
        <li class="list"  @click="changeTab(pages.notes)">
          <a href="#">
            <span class="icon">
              <font-awesome-icon :icon="['fas', 'pen']"></font-awesome-icon>
            </span>
            <span class="text">{{ $t('footer.notes') }}</span>
          </a>
        </li>
        <li class="list" @click="changeTab(pages.set)">
          <a href="#">
            <span class="icon">
              <font-awesome-icon :icon="['fas', 'gear']"></font-awesome-icon>
            </span>
            <span class="text">{{ $t('footer.set') }}</span>
          </a>
        </li>
        <div class="indicator"></div>
      </ul>
    </div>
  </div>
</template>

<script>

import { mapState } from "vuex";
import { PAGES } from "@/utilities/constants";
import { changeTab } from "@/utilities/mixins";

export default {
  data() {
    return {
      pages: PAGES,
    }
  },
  mixins: [
    changeTab,
  ],
  ...mapState([
      'page',
    ]),
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
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  background: #333;
  display: flex;
  justify-content: center;
  height: 12%;
  border-top: 2px solid #00FFFF;
}

.footer-navigation ul{
  display: flex;
}

.footer-navigation ul li{
  position: relative;
  list-style: none;
  text-decoration: none;
  width: 100px;
  height: 70px;
  z-index: 1;
}

.footer-navigation ul li a {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #fff;
  text-align: center;
}

svg {
  width: 30px;
  color: grey;
}

.footer-navigation ul li:nth-child(1):hover{
  background: #ffa801;
  border-bottom-left-radius: 25px;
  height: 65px;
  cursor: pointer;
}

.footer-navigation ul li:nth-child(2):hover {
  height: 64px;
  background: #ffa801;
  cursor: pointer;
}

.footer-navigation ul li:nth-child(3):hover {
  height: 64px;
  background: #ffa801;
  cursor: pointer;
}

.footer-navigation ul li:nth-child(4):hover {
  height: 65px;
  background: #ffa801;
  border-bottom-right-radius: 25px;
  cursor: pointer;
}

.footer-navigation ul li a .icon svg{
  position: relative;
  line-height: 75px;
  transition: 0.5s;
  margin-top: 18px;
  margin-right: 3px;
  font-size: 30px;
}

.footer-navigation ul li:hover a .icon svg{
  width: 15px;
  transform: translateY(-6px);
}

.footer-navigation ul li a .text {
  position: absolute;
  top: 35px;
  font-size: 12px;
  color: white;
  bottom: 18px;
  font-weight: 500;
  transition: 0.25s;
  text-transform: uppercase;
  transform: scale(0);
}

.footer-navigation ul li:hover a .text {
  margin-top: 5px;
  transform: scale(1);
}
</style>