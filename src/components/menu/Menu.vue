<template>
  <div>
    <div class="navbar-item">
      <div class="field is-grouped">
        <p class="control">
          <a class="button">
            <span class="icon">
              <i class="fas fa-user-plus"></i>
            </span>
            <span>{{ signupLabel }}</span>
          </a>
        </p>
        <p class="control">
          <a class="button">
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
        <router-link
          class="navbar-item"
          :to="{ path: '/wishlist', name: 'wishlist-container-component' }"
        >{{ wishlistLabel }}</router-link>
        <hr class="navbar-divider">
        <a class="navbar-item" @click="logout">{{ logoutLabel }}</a>
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
      signupLabel: "Sign up"
    };
  },

  computed: {},

  methods: {}
};
</script>

