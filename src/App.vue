<template>
  <div>
    <!-- <h2>a test </h2>
    <img alt="Vue logo" src="../public/assets/logo.png">
    <ShopComponent/> -->
    <header-component></header-component>
    <router-view></router-view>
    <footer-component></footer-component>
  </div>
</template>

<script>
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
// import ShopComponent from "./components/ShopComponent.vue";

export default {
  name: "app",
  components: {
    "header-component": Header,
    "footer-component": Footer,
    //  ShopComponent
  }
};
</script>

<style lang="scss" src="./global-style.scss">
</style>


