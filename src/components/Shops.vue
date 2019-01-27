<template>
  <div>
    <div class="card-image">
      <figure class="image is-4by3">
        <img :src="shop.picture" alt="Placeholder image">
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">{{ shop.name }}</p>
        </div>
      </div>
      <div class="content is-clearfix">
        <p>{{ shop.email }}</p>

        <p class="is-pulled-right">
          <span class="title is-4">
            <strong>{{ shop.city }}</strong>
          </span>
        </p>
        <p>
          {{ getadress(shop.location.coordinates[0],shop.location.coordinates[1]) }}
          {{Shopadresse}}
        </p>
      </div>
      <div class="card-footer btn-actions">
        <div class="card-footer-item field is-grouped">
          <div class="buttons">
            <div>
              <!--  v-show="product.isFavourite" -->
              <button
                class="button is-small"
                :title="removeFromFavouriteLabel"
                @click="removeFromFavourite(shop._id)"
              >
                <span class="icon is-small">
                  <i class="fas fa-heart"></i>
                </span>
              </button>
              <!-- v-show="!product.isFavourite" -->
              <button
                class="button is-small btn-right"
                :title="addToFavouriteLabel"
                @click="saveToFavorite(shop._id)"
              >
                <span class="icon is-small">
                  <i class="far fa-heart"></i>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <router-link
      class="details"
      :to="{
        path: '/Shop-detail',
        name: 'Shop-detail-component',
        params: {
          id: shop._id,
          name: shop.name,
          city: shop.city,
          email: shop.email
        }
      }"
    ></router-link>-->
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);

export default {
  name: "Shops-component",
  props: ["shop"],

  data() {
    return {
      addToCartLabel: "Add to cart",
      viewDetailsLabel: "Details",
      removeFromCartLabel: "Remove from cart",
      addToFavouriteLabel: "Add to favourite",
      removeFromFavouriteLabel: "Remove from favourite",
      selected: 1,
      quantityArray: [],
      Shopadresse: "test"
    };
  },

  mounted() {
    for (let i = 1; i <= 20; i++) {
      this.quantityArray.push(i);
    }

    if (this.$props.shop.quantity > 1) {
      this.selected = this.$props.shop.quantity;
    }
  },

  computed: {},

  methods: {
    getadress(lng, lat) {
      const googlekey = "AIzaSyDt2EcehfMjQFOrtH6BaMWtRs0glx4SrRQ";
      const url =
        "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
        lat +
        "," +
        lng +
        "&key=" +
        googlekey;
      axios.get(url).then(r => {
        this.Shopadresse = r.data.results[0].formatted_address;
      });
    },
    saveToFavorite(shopid) {
      let isUserLogged = this.$store.state.userInfo.isLoggedIn;
      const userid = this.$store.getters.getUserId;
      if (isUserLogged) {
        this.$store.dispatch("addToFavourite", { shopid, userid });
        this.$store.dispatch("loadNearShopUser", userid);
        console.log(this.$store.state.shops[0].name);
      } else {
        this.$store.commit("showLoginModal", true);
      }
    },
    removeFromFavourite(id) {
      this.$store.commit("removeFromFavourite", id);
    }
  }
};
</script>

<style lang="scss" scoped>
.details {
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;

  &:hover {
    border: 1px solid #51bafc;
  }
}
.button,
.select {
  z-index: 2;
}
.btn-right {
  position: absolute;
  right: 30px;
}
</style>


