import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(Vuex);
Vue.use(VueAxios, axios);
const url = "http://localhost:2000/api/shops";

export default new Vuex.Store({
  state: {
    shops: [],
    error: ""
  },

  getters: {
    // ShopsAdded: state => {
    //   return state.Shops.filter(el => {
    //     return el.isAddedToCart;
    //   });
    // },
    // ShopsAddedToFavourite: state => {
    //   return state.Shops.filter(el => {
    //     return el.isFavourite;
    //   });
    // },
    // getShopById: state => id => {
    //   return state.Shops.find(Shop => Shop.id == id);
    // },
    // isUserLoggedIn: state => {
    //   return state.userInfo.isLoggedIn;
    // },
    // isUserSignedUp: state => {
    //   return state.userInfo.isSignedUp;
    // },
    // getUserName: state => {
    //   return state.userInfo.name;
    // },
    // isLoginModalOpen: state => {
    //   return state.systemInfo.openLoginModal;
    // },
    // isSignupModalOpen: state => {
    //   return state.systemInfo.openSignupModal;
    // },
    // isCheckoutModalOpen: state => {
    //   return state.systemInfo.openCheckoutModal;
    // },
    // quantity: state => {
    //   return state.Shops.quantity;
    // }
  },

  mutations: {
    SET_SHOPS(state, shops) {
      state.shops = shops;
    }
  },

  actions: {
    loadShops({ commit }) {
      axios
        .get(url)
        .then(r => r.data)
        .then(data => data.data)
        .then(shop => {
          commit("SET_SHOPS", shop);
        });
    }

    // this.shops = await ShopServices.getShops();
  }
});
