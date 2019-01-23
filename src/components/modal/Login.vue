<template>
  <div :class="[ openModal ? 'is-active' : '', 'modal' ]">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p v-if="!isUserLoggedIn" class="modal-card-title">{{ modalTitle }}</p>
        <p v-if="isUserLoggedIn" class="modal-card-title">{{ modalTitleLoggedIn }}</p>
        <button class="delete" aria-label="close" @click="closeModal"></button>
      </header>
      <!-- <div>{{ error }}</div> -->
      <form @submit="checkForm" action="#" method="post">
        <section class="modal-card-body">
          <div v-if="!isUserLoggedIn">
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input
                  :class="[highlightEmailWithError ? 'input is-danger' : 'input']"
                  type="email"
                  :placeholder="emailPlaceholder"
                  name="emailName"
                  v-model="email"
                  @keyup="checkEmailOnKeyUp(email)"
                >
                <span class="icon is-small is-left">
                  <i class="fas fa-envelope"></i>
                </span>
                <span v-if="highlightEmailWithError !== null" class="icon is-small is-right">
                  <i
                    :class="[highlightEmailWithError ? 'fas fa-exclamation-circle' : 'fas fa-check']"
                  ></i>
                </span>
              </p>
              <p v-if="highlightEmailWithError" class="help is-danger">{{ emailRequiredLabel }}</p>
            </div>
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input
                  :class="[highlightPasswordWithError ? 'input is-danger' : 'input']"
                  type="password"
                  placeholder="Your password"
                  name="passwordName"
                  v-model="password"
                  @keyup="checkPasswordOnKeyUp(password)"
                >
                <span class="icon is-small is-left">
                  <i class="fas fa-lock"></i>
                </span>
                <span v-if="highlightPasswordWithError !== null" class="icon is-small is-right">
                  <i
                    :class="[highlightPasswordWithError ? 'fas fa-exclamation-circle' : 'fas fa-check']"
                  ></i>
                </span>
              </p>
              <p
                v-if="highlightPasswordWithError"
                class="help is-danger"
              >{{ passwordRequiredLabel }}</p>
            </div>
          </div>
          <div v-if="isUserLoggedIn" class="level">
            <div class="level-item has-text-centered">
              <div>
                <p class="title">Welcome back!</p>
                <p class="heading">Now you are logged in</p>
              </div>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button v-if="!isUserLoggedIn" type="submit" class="button is-info">{{ primaryBtnLabel }}</button>
          <button
            v-if="isUserLoggedIn"
            type="button"
            class="button is-info"
            @click="closeModal"
          >{{ btnLoggedInLabel }}</button>
        </footer>
      </form>
    </div>
  </div>
</template>

<script>
import { isValidEmail } from "../../validators";

export default {
  name: "login-component",

  data() {
    return {
      modalTitle: "Log in",
      modalTitleLoggedIn: "Welcome!",
      primaryBtnLabel: "Log in",
      emailRequiredLabel: "Email required",
      passwordRequiredLabel: "Password required",
      emailNotValidLabel: "Valid email required",
      btnLoggedInLabel: "Close",
      emailPlaceholder: "Your email",
      email: "",
      password: "",
      highlightEmailWithError: null,
      highlightPasswordWithError: null,
      isFormSuccess: false,
      error: ""
    };
  },

  computed: {
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn;
    },
    openModal() {
      if (this.$store.getters.isLoginModalOpen) {
        return true;
      } else {
        return false;
      }
    }
  },

  methods: {
    closeModal() {
      this.$store.commit("showLoginModal", false);
    },
    checkForm(e) {
      e.preventDefault();
      this.highlightEmailWithError = false;
      this.highlightPasswordWithError = false;

      const email = this.email;
      const password = this.password;
      if (email && password) {
        this.$store
          .dispatch("login", { email, password })
          .then(() => {
            this.error = this.$store.getters.geterror;
            if (this.error !== "") {
              if (this.error.includes("Email")) {
                this.highlightEmailWithError = true;
                this.emailRequiredLabel = this.$store.getters.geterror;
              }
              if (this.error.includes("pass")) {
                this.highlightPasswordWithError = true;
                this.passwordRequiredLabel = this.$store.getters.geterror;
              }
            } else {
              this.email == "";
              this.password == "";
              this.$router.push("/");
              this.isFormSuccess = true;
              this.$store.commit("isUserLoggedIn", this.isFormSuccess);
            }
          })
          .catch(err => (this.error = err));
      }
    },
    checkEmailOnKeyUp(emailValue) {
      if (emailValue && isValidEmail(emailValue)) {
        this.highlightEmailWithError = false;
      } else {
        this.highlightEmailWithError = true;

        if (!isValidEmail(emailValue)) {
          this.emailRequiredLabel = this.emailNotValidLabel;
        }
      }
    },
    checkPasswordOnKeyUp(passwordValue) {
      if (passwordValue) {
        this.highlightPasswordWithError = false;
      } else {
        this.highlightPasswordWithError = true;
      }
    },
    Emptyfields() {
      this.email == "";
      this.password == "";
    }
  }
};
</script>

<style lang="scss">
.fa-exclamation-circle {
  color: red;
}
.fa-check {
  color: green;
}
</style>


