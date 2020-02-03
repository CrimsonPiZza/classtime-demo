<template>
  <v-app>
    <v-card>
      <!-- <v-system-bar color="#000000" dark>
				<v-spacer></v-spacer>

				<v-icon>mdi-window-minimize</v-icon>

				<v-icon>mdi-window-maximize</v-icon>

				<v-icon>mdi-close</v-icon>
			</v-system-bar> -->

      <v-card-text>
        <p class="overline mb-0 mt-2">Live</p>
        <p class="title my-0">Stream chat</p>
      </v-card-text>
      <v-divider></v-divider>
      <!-- <v-card class="chat-box">
          <div
            class="message"
            v-for="message in messages"
            v-bind:key="message._id"
          >
            <div class="message-text py-2">
              <span class="username">{{ message.username }}</span>
              : {{ message.msg }}
            </div>
            <v-divider></v-divider>
          </div>
        </v-card> -->
      <v-container class="pa-1 chat-box">
        <div
          class="message"
          v-for="message in messages"
          v-bind:key="message._id"
        >
          <div class="message-text py-2">
            <span class="username">{{ message.username }}</span>
            : {{ message.msg }}
          </div>
          <v-divider></v-divider>
        </div>
      </v-container>
      <v-card-actions>
        <v-container class="pa-1">
          <v-form @submit.prevent="sendMessage()" autocomplete="off">
            <!-- <v-text-field
            label="Enter Your Message Here"
            type="text"
            filled
            rounded
            dense
            outlined
            v-model="msg"
            append-outer-icon="mdi-send"
            @click:append-outer="sendMessage()"
          /> -->
            <!-- <v-text-field
            v-model="msg"
            solo
            label="Send a message"
          ></v-text-field> -->
            <v-text-field
              color="black"
              filled
              solo
              label="Send a message"
              type="text"
              append-icon="mdi-send"
              v-model="msg"
              @click:append="sendMessage()"
            ></v-text-field>
          </v-form>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-app>
</template>

<script>
import io from "socket.io-client";

export default {
  name: "chatbox",
  data() {
    return {
      username: "",
      socket: io("http://10.10.17.72:3000"),
      users: [],
      messages: [],
      msg: ""
    };
  },
  methods: {
    joinServer() {
      this.socket.on("logged-in", data => {
        this.messages = data.messages;
        this.users = data.users;
        this.socket.emit("new-user", this.username);
      });

      this.listen();
    },
    listen() {
      this.socket.on("user-online", user => {
        this.users.push(user);
      });

      this.socket.on("user-left", user => {
        this.users.splice(this.users.indexOf(user), 1);
      });

      this.socket.on("msg", message => {
        this.messages.push(message);
      });
    },
    sendMessage() {
      if (!this.msg) {
        // console.log('No Message')
        return;
      }

      // console.log(this.msg)
      this.socket.emit("msg", this.msg);
      this.msg = "";
    }
  },
  mounted() {
    // this.username = prompt("What is your username?", "[Anonymous]");

    // if (!this.username) {
    //   this.username = "[Anonymous]";
    // }

    // this.joinServer();
  }
};
</script>

<style scoped>
.chat-box {
  height: 700px;
  overflow: auto;
}
.username {
  text-decoration: underline;
  font-weight: bold;
  color: #0275d8;
}
</style>
