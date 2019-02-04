<template>
<div class="container">
  <h1>Shops</h1>
  <hr>
  <p class="error" v-if="error">{{ error }}</p>
  <div class="posts-container">
    <div class="post" v-for="(shop,index) in shops"
    v-bind:item="shop"
    v-bind:index="index"
    v-bind:key="shop._id"
    >
   <div class="text">{{shop.name}}</div>
    <div class="text">{{shop.city}}</div>
     <div class="text">{{shop.email}}</div>
    </div>
  </div>
</div>
</template>

<script>
import ShopService from '../ShopService';
export default {
  name: 'ShopService',
  data(){
    return{
      shops: [],
      error:'',
      text:''
    }
  },
  async created() {
    try {
      this.shops = await ShopService.getShops();
    } catch (err) {
      this.error = err.message;
    }
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.container{
  max-width: 800px;
  margin: 0 auto;
}
p.error{
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}

div.post{
  position: relative;
  border: 1px solid #5bd658;
  background-color: #bcffb8;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}
div.created-at{
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15px 5px 15px;
  background-color: darkgreen;
  color: white;
  font-size: 13px;
}
p.text{
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
