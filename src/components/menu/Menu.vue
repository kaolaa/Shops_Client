<template>
  <div>
    <div class="navbar-end">
      <div class="navbar-item" v-if="isUserLoggedIn">
        <a class="navbar-item" @click="likedshop">
          <span class="icon">
            <i class="fa fa-heart"></i>
          </span> {{likedshopLabel}}
        </a>
        
        <a class="navbar-item" @click="Nearbyshop">
          <span class="icon">
            <i class="fa fa-globe"></i>
          </span> {{nearbyshopLabel}}
        </a>
       <div  class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">Welcome {{ getUserName }}</a>
        <div class="navbar-dropdown is-boxed">
          <hr class="navbar-divider">
          <a class="navbar-item" @click="logout">{{ logoutLabel }}</a>
        </div>
      </div></div>
     
      <div class="navbar-item">
        <div class="field is-grouped">
          <p class="control">
            <a v-if="!isUserLoggedIn" class="button" @click="showSignupModal">
              <span class="icon">
                <i class="fas fa-user-plus"></i>
              </span>
              <span>{{ signupLabel }}</span>
            </a>
          </p>
          <p class="control">
            <a v-if="!isUserLoggedIn" class="button" @click="showLoginModal">
              <span class="icon">
                <i class="fas fa-user"></i>
              </span>
              <span>{{ loginLabel }}</span>
            </a>
          </p>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  name: "menu-component",
  data() {
    return {
      logoutLabel: "Log out",
      loginLabel: "Log in",
      signupLabel: "Sign up",
      likedshopLabel: "Liked shop",
      nearbyshopLabel: "Nearby shop"


    };
  },

  computed: {
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn;
    },
    getUserName() {
      let name = this.$store.getters.getUserName;
      return name;
    }
  },

  methods: {
    likedshop() {
      const userid = this.$store.getters.getUserId;
      if (this.$store.state.userInfo.isLoggedIn) {
        this.$store.dispatch("loadLikedShops", userid);
      } else {
        this.$store.commit("showLoginModal", true);
      }
    },
    Nearbyshop() {
      const userid = this.$store.getters.getUserId;
      if (this.$store.state.userInfo.isLoggedIn) {
        this.$store.dispatch("loadNearShopUser", userid);
      } else {
        this.$store.commit("showLoginModal", true);
      }
    },
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$store.dispatch("loadNearShop");

        this.$router.push({ name: "homepage-component" });
      });
    },

    showLoginModal() {
      this.$store.commit("showLoginModal", true);
    },
    showSignupModal() {
      this.$store.commit("showSignupModal", true);
    }
  }
};
</script>

