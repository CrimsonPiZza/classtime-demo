<template>
  <v-app>
    <Navbar v-if="$route.name !== 'login'" :user="user" />
    <v-content>
      <router-view :user="user"></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "./components/NavbarComponents/Navbar";
import backend from "./Service";
import auth from "./auth";
import synclog from "./synclog";

export default {
  name: "App",
  methods: {
    async getUser() {
      const user = await backend.getUserInfo();
      this.user.name = user.data.name;
      this.user.role = user.data.role;
    }
  },
  components: {
    Navbar
  },

  data: () => ({
    user: {
      name: "",
      role: "",
      isStreaming: false
    }
  }),

  created() {
    this.getUser();
    auth();
    synclog;
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
