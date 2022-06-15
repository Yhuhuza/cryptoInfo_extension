<template>
  <div class="menu-header">
    <div class="menu-name">
      <img class="header-logo" :src="imageLogo">
    </div>
    <ul class="social-links">
      <li><a href="https://twitter.com/?lang=en">
        <font-awesome-icon :icon="['fab', 'twitter']"></font-awesome-icon>
      </a></li>
      <li><a href="https://web.whatsapp.com/">
        <font-awesome-icon :icon="['fab', 'whatsapp']"></font-awesome-icon>
      </a></li>
      <li><a href="https://www.youtube.com/">
        <font-awesome-icon :icon="['fab', 'youtube']"></font-awesome-icon>
      </a></li>
      <li><a href="https://github.com/Yhuhuza/">
        <font-awesome-icon :icon="['fab', 'github']"></font-awesome-icon>
      </a></li>
    </ul>
  </div>
</template>

<script>
import imageLogo  from '../../../assets/headerLogo/imageLogo.svg';


export default {
  data() {
    return {
      imageLogo,
    }
  }

}
</script>

<style scoped>

.menu-header {
  display: flex;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  height: 12%;
  border-top: 2px solid #333;
  border-left: 2px solid #333;
  border-right: 2px solid #333;
  background: #333;
  border-bottom: 2px solid #00FFFF;
}

.menu-name {
  width: 250px;
}

.social-links {
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
}

ul {
  position: relative;
  display: flex;
  margin-right: 15px;
}

ul li {
  list-style: none;
  position: relative;
  margin: 35px 0 0 15px;
  cursor: pointer;
}

ul li a {
  text-decoration: none;
}


.social-links li a svg {
  color: gray;
  width: 16px;
}

.social-links li a svg:hover {
  color: orange;
  transition: 0.8s;
  transform: scale(1.2);
}

font-awesome-icon {
  color: red;
  font-size: 26px;
}

.header-logo {
  margin-top: 8px;
  margin-left: 20px;
   height: 50px;
}

</style>