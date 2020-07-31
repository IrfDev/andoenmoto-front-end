<template>
  <div class="column-fluid login align-items-center">
    <div class="row m-0 justify-content-center">
      <div class="align-items-center col-12 mt-4 mt-md-5">
        <thundie-row>
          <h1>SignIn</h1>
        </thundie-row>
      </div>

      <div class="text-center cta-facebook col-10 mt-3 order-md-2 justify-content-center">
        <button @click="registerFacebook" class="btn-red btn-xsmall">
          Sign In
          <i class="fa fa-facebook fa-btn" />
        </button>
      </div>

      <form @submit.prevent="register" class="row m-3 mt-4 order-md-1 justify-content-center">
        <div class="form-group col-12 col-md-6">
          <input
            v-model.lazy="form.email"
            id="email"
            type="email"
            @blur="$v.form.email.$touch()"
            class="form-control"
            placeholder="Correo electrónico"
          />
          <template v-if="$v.form.email.$error">
            <span v-if="!$v.form.email.required" class="form-error">E-mail is required</span>
            <span v-else-if="!$v.form.email.email" class="form-error">Please enter a valid e-mail</span>
          </template>
        </div>

        <div class="form-group col-12 col-md-6">
          <input
            v-model="form.password"
            id="password"
            type="password"
            class="form-control"
            placeholder="Contraseña"
            @blur="$v.form.password.$touch()"
          />
          <template v-if="$v.form.password.$error">
            <span v-if="!$v.form.password.required" class="form-error">Password field is required</span>
            <span v-if="!$v.form.password.minLength" class="form-error">
              Password is less than 6 characters, please double check your
              password
            </span>
          </template>
        </div>

        <div class="form-register col-md-6 col-12">
          <button type="submit" class="btn-blue btn-block">Log in</button>
        </div>
        <div class="cta-log-gin text-center w-100 mt-2">
          <router-link class="cta-login" to="/register">Create new account</router-link>
        </div>
      </form>
    </div>
    <img src="/images/util/thunder.png" class="img-fluid m-5" alt />
  </div>
</template>

<script>
import firebase from "firebase";
import { mapActions } from "vuex";
import {
  required,
  minLength,
  maxLength,
  email,
  url,
  helpers as vuelidateHelpers,
} from "vuelidate/lib/validators";

export default {
  name: "Login",
  data() {
    return {
      form: {
        username: null,
        email: null,
        password: null,
      },
    };
  },

  validations: {
    form: {
      name: {
        minLength: minLength(5),
        maxLength: maxLength(20),
        required,
      },

      username: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(20),
      },

      email: {
        required,
        email,
      },

      password: {
        required,
        minLength: minLength(6),
      },
    },
  },

  methods: {
    ...mapActions({
      registerUserEmailPassword: "auth/registerUserEmailPassword",

      registerUserFacebook: "auth/registerUserFacebook",
    }),

    async register() {
      await this.registerUserEmailPassword(this.form);
      this.$router.push("/");
    },

    async registerFacebook() {
      await this.registerUserFacebook();
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
.cta-login {
  color: white;
  text-decoration: underline;
}

.form-error::before {
  content: " ❌ ";
}

.form-error {
  color: rgb(255, 107, 107);
  font-family: $paragraph;
  align-self: center;
  font-weight: 100;
  // color:white;
}

input {
  text-align: center;
  font-family: $paragraph;
  color: black;
}

.login {
  min-height: 100vh;
  background: $main-gradient;
}

h1 {
  font-family: $typo;
  color: white;
  text-align: center;
}

.form-register {
  button {
    color: $alpha;
    background-color: $complementary;
    font-family: $title;
    border: none;
    padding: 2% 20%;
    border-radius: 4px;
    width: 100%;
  }
}
.cta-facebook {
  button {
    color: white;
    background-color: #4267b2;
    border: none;
    font-family: $title;
    padding: 1% 5%;
    border-radius: 4px;
  }
}
</style>
