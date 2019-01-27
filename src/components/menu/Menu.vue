<template>
  <div>
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
    <div v-if="isUserLoggedIn" class="navbar-item has-dropdown is-hoverable">
      <a class="navbar-link">Welcome {{ getUserName }}</a>
      <div class="navbar-dropdown is-boxed">
        <hr class="navbar-divider">
        <a class="navbar-item" @click="logout">{{ logoutLabel }}</a>
        <a class="navbar-item" @click="likedshop">{{ likedshopLable }}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "menu-component",
  data() {
    return {
      likedshopLable: "Liked shops",
      logoutLabel: "Log out",
      loginLabel: "Log in",
      signupLabel: "Sign up"
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
    logout() {
      this.$store.dispatch("logout").then(() => {
        // redirect to homepage
        this.$router.push({ name: "homepage-component" });
      });
    },
    likedshop() {
    const userid = this.$store.getters.getUserId;

      this.$store.dispatch("loadLikedShops",userid)
      // .then(() => {
      //   // redirect to homepage
      //   this.$router.push({ name: "homepage-component" });
      // });
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

