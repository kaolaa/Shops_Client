import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(Vuex);
Vue.use(VueAxios, axios);

export default new Vuex.Store({
  state: {
    shops: [],
    error: "",
    msg: "",
    userInfo: {
      isLoggedIn: false,
      isSignedUp: false,
      hasSearched: false,
      id: "",
      name: ""
    },
    systemInfo: {
      openLoginModal: false,
      openSignupModal: false
    }
  },

  getters: {
    
    geterror: state => {
      return state.error;
    },
    getmsg: state => {
      return state.msg;
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
    getUserId: state => {
      return state.userInfo.id;
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
    setmsg: (state, msg) => {
      state.msg = msg;
    },
    //users
    isUserLoggedIn: (state, isUserLoggedIn) => {
      state.userInfo.isLoggedIn = isUserLoggedIn;
    },
    isUserSignedUp: (state, isSignedUp) => {
      state.userInfo.isSignedUp = isSignedUp;
    },
    setUserName: (state, name) => {
      state.userInfo.name = name;
    },
    setUserId: (state, id) => {
      state.userInfo.id = id;
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
              commit("setUserId", user._id);
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
        commit("setUserId", "");
        commit("isUserSignedUp", false);
        commit("isUserLoggedIn", false);
        resolve();
      });
    },
    loadShops({ commit }) {
      const url = "http://localhost:2000/api/shops";
      axios
        .get(url)
        .then(r => r.data)
        .then(data => data.data)
        .then(shop => {
          commit("SET_SHOPS", shop);
        });
    },
    loadLikedShops({ commit },userid) {
      const url = "http://localhost:2000/api/users/liked?iduser="+userid;
      axios
        .get(url)
        .then(r => r.data)
        .then(shop => {
          commit("SET_SHOPS", shop);
        });
    },
    loadNearShop({ commit }) {
      return new Promise((resolve, reject) => {
        let lng;
        let lat;
        navigator.geolocation.getCurrentPosition(
          position => {
            lat = position.coords.latitude;
            lng = position.coords.longitude;
            const url =
              "http://localhost:2000/api/shops/near?lat=" + lat + "&lng=" + lng;
            console.log(url);
            axios
              .get(url)
              .then(r => r.data)
              .then(data => data.data)
              .then(shops => {
                commit("SET_SHOPS", shops);
              });
          },
          err => {
            reject(err);
          }
        );
      });
    },
    loadNearShopUser({ commit }, iduser) {
      return new Promise((resolve, reject) => {
        let lng;
        let lat;
        navigator.geolocation.getCurrentPosition(
          position => {
            lat = position.coords.latitude;
            lng = position.coords.longitude;
            const url =
              "http://localhost:2000/api/users/near?iduser="+iduser+"&lat="+lat+"&lng="+lng;
            console.log(url);
            axios
              .get(url)
              .then(r => r.data)
              .then(data => data.data)
              .then(shops => {
                commit("SET_SHOPS", shops);
              });
          },
          err => {
            reject(err);
          }
        );
      });
    },
    addToFavourite({ commit }, data) {
      console.log(data.userid + " " + data.shopid);
      const url =
        "http://localhost:2000/api/users/like?iduser=" +
        data.userid +
        "&idshop=" +
        data.shopid;
      axios
        .get(url)
        .then(r => r.data)
        .then(data => commit("setmsg", data.msg));
    }
  }
});
