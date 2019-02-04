<template>

  <div class="hero is-medium is-bold">
        <img src="../../../public/assets/shops.jpg" alt="">

    <div class="hero-body">
      
      <div class="container">
        
        <h1 class="title">Vue the Shops</h1>
        <h2
          class="subtitle"
        >A single web page with Vue js, Express js and MongoDB to look for nearby shops.</h2>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.hero {
  img{
      height:500px;
    width:100%;
    text-align:center;
    background-size:cover;
    -webkit-filter: blur(3px);
    -moz-filter: blur(3px);
    -o-filter: blur(3px);
    -ms-filter: blur(3px);
    filter: blur(3px);
    position: absolute;
    left:0;
    top: 0;
  }

}

h1,
h2 {
  font-weight: bold;
  color: #fff;
}
</style>