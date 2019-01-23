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
    error: "",
    userInfo: {
      isLoggedIn: false,
      isSignedUp: false,
      hasSearched: false,
      name: ""
    },
    systemInfo: {
      openLoginModal: false,
      openSignupModal: false
    }
  },

  getters: {
    shopsAdded: state => {
      return state.shops.filter(el => {
        return el.isAddedToCart;
      });
    },
    shopsAddedToFavourite: state => {
      return state.shops.filter(el => {
        return el.isFavourite;
      });
    },
    geterror: state => {
      return state.error;
    },
    getshopById: state => id => {
      return state.shops.find(shop => shop.id == id);
    },
    isUserLoggedIn: state => {
      return state.userInfo.isLoggedIn;
    },
    isUserSignedUp: state => {
      return state.userInfo.isSignedUp;
    },
    getUserName: state => {
      return state.userInfo.name;
    },
    isLoginModalOpen: state => {
      return state.systemInfo.openLoginModal;
    },
    isSignupModalOpen: state => {
      return state.systemInfo.openSignupModal;
    },
    isCheckoutModalOpen: state => {
      return state.systemInfo.openCheckoutModal;
    },
    quantity: state => {
      return state.shops.quantity;
    }
  },

  mutations: {
    //shops
    SET_SHOPS(state, shops) {
      state.shops = shops;
    },
    addToFavourite: (state, id) => {
      state.shops.forEach(el => {
        if (id === el.id) {
          el.isFavourite = true;
        }
      });
    },
    quantity: (state, data) => {
      state.shops.forEach(el => {
        if (data.id === el.id) {
          el.quantity = data.quantity;
        }
      });
    },
    removeFromFavourite: (state, id) => {
      state.shops.forEach(el => {
        if (id === el.id) {
          el.isFavourite = false;
        }
      });
    },
    removeshopsFromFavourite: state => {
      state.shops.filter(el => {
        el.isFavourite = false;
      });
    },
    seterror: (state, error) => {
      state.error = error;
    },
    //users
    isUserLoggedIn: (state, isUserLoggedIn) => {
      state.userInfo.isLoggedIn = isUserLoggedIn;
    },
    isUserSignedUp: (state, isSignedUp) => {
      state.userInfo.isSignedUp = isSignedUp;
    },
    setHasUserSearched: (state, hasSearched) => {
      state.userInfo.hasSearched = hasSearched;
    },
    setUserName: (state, name) => {
      state.userInfo.name = name;
    },
    setshopTitleSearched: (state, titleSearched) => {
      state.userInfo.shopTitleSearched = titleSearched;
    },
    showLoginModal: (state, show) => {
      state.systemInfo.openLoginModal = show;
    },
    showSignupModal: (state, show) => {
      state.systemInfo.openSignupModal = show;
    }
  },

  actions: {
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        axios({
          url: "http://localhost:2000/api/users/singup",
          data: user,
          method: "POST"
        })
          .then(resp => {
            console.log(resp);
            if (resp.data.err) {
              commit("seterror", resp.data.err);
            } else {
              const user = resp.data.user;
              commit("isUserSignedUp", true);
              commit("setUserName", user.FirstName);
            }
            resolve(resp);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        axios({
          url: "http://localhost:2000/api/users/singin",
          data: user,
          method: "POST"
        })
          .then(resp => {
            console.log(resp);
            if (resp.data.err) {
              commit("seterror", resp.data.err);
            } else {
              const user = resp.data.user;
              commit("isUserLoggedIn", true);
              commit("setUserName", user.FirstName);
            }
            resolve(resp);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise(resolve => {
        commit("setUserName", "");
        commit("isUserSignedUp", false);
        commit("isUserLoggedIn", false);
        resolve();
      });
    },
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
