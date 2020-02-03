<template>
  <v-card flat width="600">
    <v-tabs v-model="tab" background-color="transparent" centered color="black" class="mb-5">
      <v-tab v-for="item in items" :key="item">
        <div style="width: 100px">{{ item }}</div>
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item style="height:400px" v-for="item in items" :key="item">
        <v-container class="px-12" v-if="item=='Login'">
          <v-form ref="form" @submit.prevent="login()">
            <v-text-field id="usernameInput" label="E-mail" v-model="username"></v-text-field>
            <v-text-field
              id="passwordInput"
              label="Password"
              v-model="password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
            ></v-text-field>

            <v-checkbox
              color="black"
              v-model="login_checkbox"
              label="Remember my password"
              required
              class="mb-5 mt-6"
            ></v-checkbox>

            <v-btn color="black" dark block height="50" @click="login()">Login</v-btn>
          </v-form>
        </v-container>
        <v-container class="px-12" v-else>
          <v-form ref="form" @submit.prevent="register()">
            <v-text-field label="Username" v-model="register_username"></v-text-field>
            <v-text-field label="Email" v-model="register_email"></v-text-field>
            <v-text-field
              label="Password"
              v-model="register_password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
            ></v-text-field>

            <v-checkbox
              color="black"
              v-model="register_checkbox"
              :rules="[v => !!v || 'You must agree to continue!']"
              label="I agree with the Terms and Conditions."
              required
              class="mb-5 mt-6"
            ></v-checkbox>

            <v-btn color="black" dark block height="50" @click="register()">Register</v-btn>
          </v-form>
        </v-container>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import backend from "../../Service";
import auth from "../../auth";
import synclog from "../../synclog";
export default {
  data() {
    return {
      showPassword: false,
      password: "",
      username: "",
      tab: null,
      items: ["Login", "Register"],
      login_checkbox: true,
      register_checkbox: false,
      register_username: "",
      register_email: "",
      register_password: ""
    };
  },
  methods: {
    async login() {
      const message = await backend.login(this.username, this.password);
      alert(message.message);
    },
    async register() {
      const user = await backend.signUp(
        this.register_email,
        this.register_password,
        this.register_username
      );
      const { message } = user.data;
      if (message) {
        alert(message);
      } else {
        this.username = this.register_email
        this.password = this.register_password
        this.login()
      }
    }
  },
  created() {
    auth();
    synclog;
  }
};
</script>

<style>
</style>