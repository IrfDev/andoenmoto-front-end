<template>
  <div class="column-fluid register">
    <div class="row m-0 justify-content-center">
      <div class="col-12">
        <wings-row>
          <h1 class="text-center">Sign up</h1>
        </wings-row>
      </div>
      <div class="text-center cta-facebook mt-3 order-md-2 col-md-6 col-12">
        <button @click="registerFacebook" class="btn-red btn-xsmall">
          Sign up
          <i class="fa fa-facebook fa-btn" />
        </button>
      </div>
      <form
        @submit.prevent="register"
        class="row m-3 mt-5 justify-content-center"
      >
        <div class="form-group col-12 col-md-6">
          <input
            v-model="form.name"
            id="name"
            type="text"
            class="form-control"
            placeholder="Nombre"
            @blur="$v.form.name.$touch()"
          />
          <template v-if="$v.form.name.$error">
            <h1 v-if="!$v.form.name.required" class="form-error">
              Name is required
            </h1>
          </template>
        </div>

        <div class="form-group col-12 col-md-6">
          <input
            v-model="form.username"
            id="username"
            type="text"
            placeholder="Nombre de usuario"
            @blur="$v.form.username.$touch()"
            class="form-control"
          />
          <template v-if="$v.form.username.$error">
            <span v-if="!$v.form.username.required" class="form-error"
              >Username is required</span
            >
            <span v-if="!$v.form.username.minLength" class="form-error"
              >Username should have at least 5 characters</span
            >
          </template>
        </div>

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
            <span v-if="!$v.form.email.required" class="form-error"
              >E-mail is required</span
            >
            <span v-else-if="!$v.form.email.email" class="form-error"
              >It doesn't seems like an E-mail, please try again</span
            >
            <span v-else-if="!$v.form.email.unique" class="form-error"
              >This e-mail was already registered</span
            >
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
            <span v-if="!$v.form.password.required" class="form-error"
              >Password is required!</span
            >
            <span v-if="!$v.form.password.minLength" class="form-error"
              >You need a 6 characters minimum passsword</span
            >
          </template>
        </div>

        <div class="form-group col-12">
          <input
            v-model.lazy="form.avatar"
            id="avatar"
            type="text"
            class="form-control"
            placeholder="Foto de perfil"
            @blur="$v.form.avatar.$touch()"
          />
          <template v-if="$v.form.avatar.$error">
            <span v-if="!$v.form.avatar.url" class="form-error"
              >Please enter a valid url</span
            >
            <span v-if="!$v.form.avatar.supportedImageFile" class="form-error"
              >Please enter a valid image format</span
            >
            <span v-if="$v.form.avatar.responseOk" class="form-error"
              >This URL not bringing a valid image</span
            >
          </template>
        </div>

        <div class="form-register col-12 col-md-6">
          <button type="submit" class="btn-blue btn-block">Sign up</button>
        </div>
        <div class="cta-log-gin text-center w-100 mt-2">
          <router-link class="cta-register" to="/login"
            >Already have an account?</router-link
          >
        </div>
      </form>
    </div>
    <img src="/images/util/thunder.png" class="img-fluid m-5" alt />
  </div>
</template>

<script>
import firebase from 'firebase';
import { mapActions } from 'vuex';
import {
  required,
  minLength,
  maxLength,
  email,
  url,
  helpers as vuelidateHelpers,
} from 'vuelidate/lib/validators';

export default {
  name: 'Register',
  data() {
    return {
      form: {
        name: null,
        username: null,
        email: null,
        password: null,
        avatar: null,
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
        unique(value) {
          if (!vuelidateHelpers.req(value)) {
            return true;
          }
          return new Promise((res) => {
            firebase
              .database()
              .ref('users')
              .orderByChild('email')
              .equalTo(value)
              .once('value', (snapshot) => res(!snapshot.exists()));
          });
        },
      },
      password: {
        required,
        minLength: minLength(6),
      },
      avatar: {
        url,
        supportedImageFile(value) {
          if (!vuelidateHelpers.req(value)) {
            return true;
          }
          const supported = ['jpg', 'jpeg', 'gif', 'png'];
          const suffix = value.split('.').pop();
          return supported.includes(suffix);
        },
        responseOk(value) {
          if (!vuelidateHelpers.req(value)) {
            return true;
          }
          return new Promise((res) => {
            fetch(value)
              .then((response) => res(response.ok))
              .catch(() => res(false));
          });
        },
      },
    },
  },
  methods: {
    ...mapActions({
      registerUserEmailPassword: 'auth/registerUserEmailPassword',

      registerUserFacebook: 'auth/registerUserFacebook',

      authRedirectResponse: 'auth/authRedirectResponse',
    }),

    async register() {
      await this.registerUserEmailPassword(this.form);
      this.$router.push('/');
    },

    async registerFacebook() {
      await this.registerUserFacebook();
      await this.$router.push('/');
    },
  },
};
</script>

<style lang="scss" scoped>
.cta-register {
  color: white;
  text-align: center !important;
  font-family: $paragraph;
  font-weight: 100;
  text-decoration: underline;
}
.form-error::before {
  content: ' ❌ ';
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
.register {
  background: $main-gradient;
  min-height: 100vh;
}
h1 {
  font-family: $typo;
  color: white;
}
.title {
  img {
    max-width: 20vw;
    height: 100%;
  }
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
