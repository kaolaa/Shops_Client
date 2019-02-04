<template>
  <div :class="[ openModal ? 'is-active' : '', 'modal' ]">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p v-if="!isUserSignedUp" class="modal-card-title">{{ modalTitle }}</p>
        <p v-if="isUserSignedUp" class="modal-card-title">{{ modalTitleRegistered }}</p>
        <button class="delete" aria-label="close" @click="closeModal"></button>
      </header>
      <form @submit="checkForm" action="#" method="post">
        <section class="modal-card-body">
          <div v-if="!isUserSignedUp">
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input
                  :class="[highlightFirstNameWithError ? 'input is-danger' : 'input']"
                  type="text"
                  :placeholder="FirstnamePlaceholder"
                  v-model="Firstname"
                  @keyup="checkFirstNameOnKeyUp(Firstname)"
                >
                <span class="icon is-small is-left">
                  <i class="fas fa-user"></i>
                </span>
                <span v-if="highlightFirstNameWithError !== null" class="icon is-small is-right">
                  <i
                    :class="[highlightFirstNameWithError ? 'fas fa-exclamation-circle' : 'fas fa-check']"
                  ></i>
                </span>
              </p>
              <p v-if="highlightFirstNameWithError" class="help is-danger">{{ FirstnameErrorLabel }}</p>
            </div>
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input
                  :class="[highlightLastNameWithError ? 'input is-danger' : 'input']"
                  type="text"
                  :placeholder="LastnamePlaceholder"
                  v-model="Lastname"
                  @keyup="checkLastNameOnKeyUp(Lastname)"
                >
                <span class="icon is-small is-left">
                  <i class="fas fa-user"></i>
                </span>
                <span v-if="highlightLastNameWithError !== null" class="icon is-small is-right">
                  <i
                    :class="[highlightLastNameWithError ? 'fas fa-exclamation-circle' : 'fas fa-check']"
                  ></i>
                </span>
              </p>
              <p v-if="highlightLastNameWithError" class="help is-danger">{{ LastnameErrorLabel }}</p>
            </div>
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
              <p v-if="highlightEmailWithError" class="help is-danger">{{ emailErrorLabel }}</p>
            </div>
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input
                  :class="[highlightPasswordWithError ? 'input is-danger' : 'input']"
                  type="password"
                  :placeholder="passwordPlaceholder"
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
              <p v-if="highlightPasswordWithError" class="help is-danger">{{ passwordErrorLabel }}</p>
            </div>
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input
                  :class="[highlightRepeatPasswordWithError ? 'input is-danger' : 'input']"
                  type="password"
                  :placeholder="repeatPasswordPlaceholder"
                  v-model="repeatPassword"
                  @keyup="checkRepeatPasswordOnKeyUp(repeatPassword)"
                >
                <span class="icon is-small is-left">
                  <i class="fas fa-lock"></i>
                </span>
                <span
                  v-if="highlightRepeatPasswordWithError !== null"
                  class="icon is-small is-right"
                >
                  <i
                    :class="[highlightRepeatPasswordWithError ? 'fas fa-exclamation-circle' : 'fas fa-check']"
                  ></i>
                </span>
              </p>
              <p
                v-if="highlightRepeatPasswordWithError"
                class="help is-danger"
              >{{ notEqualErrorLabel }}</p>
            </div>
          </div>
          <div v-if="isUserSignedUp" class="level">
            <div class="level-item has-text-centered">
              <div>
                <p class="title">Welcome {{ Firstname }}!</p>
                <p class="heading">Now you are a member, please login</p>
              </div>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button v-if="!isUserSignedUp" class="button is-success">{{ primaryBtnLabel }}</button>
          <button
            v-if="isUserSignedUp"
            type="button"
            class="button is-info"
            @click="closeModal"
          >{{ btnRegisteredLabel }}</button>
        </footer>
      </form>
    </div>
  </div>
</template>

<script>
import { isValidEmail } from "../../validators";

export default {
  name: "registration-component",

  data() {
    return {
      modalTitle: "Sign up",
      modalTitleRegistered: "Welcome ",
      primaryBtnLabel: "Sign up",
      btnRegisteredLabel: "Close",
      FirstnamePlaceholder: "FirstName*",
      LastnamePlaceholder: "LastName*",
      emailPlaceholder: "Email*",
      passwordPlaceholder: "Password*",
      repeatPasswordPlaceholder: "Repeat Password*",
      notEqualErrorLabel: "Passwords must be equal",
      passwordErrorLabel: "Password required",
      FirstnameErrorLabel: "FirstName required",
      LastnameErrorLabel: "LastName required",
      emailErrorLabel: "Email required",
      emailNotValidLabel: "Valid email required",
      Firstname: "",
      Lastname: "",
      email: "",
      password: "",
      repeatPassword: "",
      highlightFirstNameWithError: null,
      highlightLastNameWithError: null,
      highlightEmailWithError: null,
      highlightPasswordWithError: null,
      highlightRepeatPasswordWithError: null,
      isFormSuccess: false
    };
  },

  computed: {
    isUserSignedUp() {
      return this.$store.getters.isUserSignedUp;
    },
    openModal() {
      if (this.$store.getters.isSignupModalOpen) {
        return true;
      } else {
        return false;
      }
    }
  },

  methods: {
    closeModal() {
      this.$store.commit("showSignupModal", false);
    },
    checkForm(e) {
      e.preventDefault();
      this.highlightEmailWithError = false;
      this.highlightPasswordWithError = false;
      const email = this.email;
      const password = this.password;
      const Firstname = this.Firstname;
      const Lastname = this.Lastname;
      if (
        this.Firstname &&
        this.Lastname &&
        this.email &&
        this.password &&
        this.repeatPassword
      ) {
        this.$store
          .dispatch("register", { email, password, Firstname, Lastname })
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
              this.$router.push("/");
              this.isFormSuccess = true;
              Emptyfields();
            }
          })
          .catch(err => (this.error = err));
      }

      if (!this.Firstname) {
        this.highlightFirstNameWithError = true;
      } else {
        this.highlightFirstNameWithError = false;
      }
      if (!this.Lastname) {
        this.highlightLastNameWithError = true;
      } else {
        this.highlightLastNameWithError = false;
      }
      if (!this.email) {
        this.highlightEmailWithError = true;

        if (this.email && !isValidEmail(this.email)) {
          this.emailErrorLabel = this.emailNotValidLabel;
        }
      } else {
        this.highlightEmailWithError = false;
      }

      if (!this.password) {
        this.highlightPasswordWithError = true;
      } else {
        this.highlightPasswordWithError = false;
      }

      if (!this.repeatPassword) {
        this.highlightRepeatPasswordWithError = true;
      } else {
        this.highlightRepeatPasswordWithError = false;
      }
    },
    checkFirstNameOnKeyUp(FirstnameValue) {
      if (FirstnameValue) {
        this.highlightNameWithError = false;
      } else {
        this.highlightNameWithError = true;
      }
    },
    checkLastNameOnKeyUp(LastnameValue) {
      if (LastnameValue) {
        this.highlightNameWithError = false;
      } else {
        this.highlightNameWithError = true;
      }
    },
    checkEmailOnKeyUp(emailValue) {
      if (emailValue && isValidEmail(emailValue)) {
        this.highlightEmailWithError = false;
      } else {
        this.highlightEmailWithError = true;

        if (!isValidEmail(emailValue)) {
          this.emailErrorLabel = this.emailNotValidLabel;
        }
      }
    },
    checkPasswordOnKeyUp(passwordValue) {
      if (passwordValue) {
        this.highlightPasswordWithError = false;

        if (this.repeatPassword === this.password) {
          this.highlightRepeatPasswordWithError = false;
        } else {
          this.highlightRepeatPasswordWithError = true;
        }
      } else {
        this.highlightPasswordWithError = true;
      }
    },
    checkRepeatPasswordOnKeyUp(repeatPasswordValue) {
      if (repeatPasswordValue) {
        if (repeatPasswordValue === this.password) {
          this.highlightRepeatPasswordWithError = false;
        } else {
          this.highlightRepeatPasswordWithError = true;
        }
      } else {
        this.highlightRepeatPasswordWithError = true;
      }
    },
    Emptyfields() {
      this.Firstname == "";
      this.Lastname == "";
      this.email == "";
      this.password == "";
      this.repeatPassword == "";
    }
  }
};
</script>

<style lang="scss" scoped>
.fa-exclamation-circle {
  color: red;
}
.fa-check {
  color: green;
}
</style>


