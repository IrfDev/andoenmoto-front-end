<template>
  <div class="column-fluid login">
    <div class="">
      <div class="title d-flex justify-content-around align-items-center">
        <img src="/images/util/left-wing.png" alt="" class="">
        <h1 class="text-center">Registrate</h1>
        <img src="/images/util/right-wing.png" alt="" class="">
      </div>
       <div class="text-center cta-facebook mt-3">
        <button @click="registerFacebook" class="btn-red btn-xsmall">
            Regístrate
            <i class="fa fa-facebook fa-btn"/>
        </button>
      </div>
      <form
        @submit.prevent="register"
        class="row m-3 mt-5"
      >

        <div class="form-group col-12">
          <input
            v-model="form.name"
            id="name"
            type="text"
            class="form-control"
            placeholder="Nombre"
            @blur="$v.form.name.$touch()"
          >
          <template v-if="$v.form.name.$error">
            <h1 v-if="!$v.form.name.required" class="form-error">El nombre es requerido</h1>
          </template>
        </div>

        <div class="form-group col-12">
          <input
            v-model="form.username"
            id="username"
            type="text"
            placeholder="Nombre de usuario"
            @blur="$v.form.username.$touch()"
            class="form-control">
          <template v-if="$v.form.username.$error">
            <span v-if="!$v.form.username.required" class="form-error">
              Es necesario especificar un nombre de usuario
            </span>
            <span v-if="!$v.form.username.minLength" class="form-error">
              Necesitas al menos 5 caracteres
            </span>
          </template>
        </div>

        <div class="form-group col-12">
          <input
            v-model.lazy="form.email"
            id="email" type="email"
            @blur="$v.form.email.$touch()"
            class="form-control"
            placeholder="Correo electrónico"
          >
          <template v-if="$v.form.email.$error">
            <span v-if="!$v.form.email.required" class="form-error">
              El correo electrónico es requerido
            </span>
            <span v-else-if="!$v.form.email.email" class="form-error">
              Parece que no es un correo electrónico
            </span>
            <span v-else-if="!$v.form.email.unique" class="form-error">
              Éste correo electrónico ya se encuentra registrado
            </span>
          </template>
        </div>

        <div class="form-group col-12">
          <input
            v-model="form.password"
            id="password" type="password" class="form-control"
            placeholder="Contraseña"
            @blur="$v.form.password.$touch()">
          <template v-if="$v.form.password.$error">
            <span v-if="!$v.form.password.required" class="form-error">
              Es requerida una contraseña
            </span>
            <span v-if="!$v.form.password.minLength" class="form-error">
              Necesitas una contraseña mínimo de 6 caracteres
            </span>
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
          >
          <template v-if="$v.form.avatar.$error">
            <span v-if="!$v.form.avatar.url" class="form-error">
              Ingresa una url válida
            </span>
            <span v-if="!$v.form.avatar.supportedImageFile" class="form-error">
              Ingresa un formato válido de imágenes
            </span>
            <span v-if="$v.form.avatar.responseOk" class="form-error">
              El URL no puede traer ninguna imagen
            </span>
          </template>
        </div>

        <div class="form-register col-12">
          <button type="submit" class="btn-blue btn-block">Regístrate</button>
        </div>
        <div class="cta-log-gin text-center w-100 mt-2">
          <router-link class="cta-login" to="/">
            Ya tengo cuenta
          </router-link>
        </div>
      </form>
    </div>
    <img src="/images/util/thunder.png" class="img-fluid m-5" alt="">
  </div>
</template>

<script>
import firebase from 'firebase';
import { mapActions } from 'vuex';
import {
  required, minLength, maxLength, email, url, helpers as vuelidateHelpers,
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
            firebase.database().ref('users').orderByChild('email').equalTo(value)
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
    }),
    async register() {
      await this.registerUserEmailPassword(this.form);
      this.$router.push('/');
    },
    async registerFacebook() {
      await this.registerUserFacebook();
      this.$router.push('/');
    },
  },
};
</script>

<style lang='scss' scoped>
.cta-login{
  color:white;
  text-align:center!important;
  font-family: $paragraph;
  font-weight: 100;
  text-decoration: underline;
}
.form-error::before {
  content: ' ❌ '
}
.form-error{
  color:rgb(255, 107, 107);
  font-family: $paragraph;
  font-size:5vw;
  align-self:center;
  font-weight: 100;
  // color:white;
}
input{
  text-align: center;
  font-family: $paragraph;
  color: black;
}
.login{
  background:$main-gradient;
}
h1{
  font-family:$typo;
  color:white;
  font-size:20vw;
}
.title{
  img{
    max-width: 20vw;
    height:100%;
  }
}
.form-register{
  button{
    color:$alpha;
    background-color:$complementary;
    font-family: $title;
    font-size:6.5vw;
    border:none;
    padding: 2% 20%;
    border-radius:4px;
    width:100%;
  }
}
.cta-facebook{
  button{
    color:white;
    background-color: #4267B2;
    border: none;
    font-size: 6vw;
    font-family: $title;
    padding: 1% 5%;
    border-radius:4px;
  }
}
</style>
