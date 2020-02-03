<template>
  <v-dialog v-model="start_stream" max-width="670px">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" outlined id="startStreamBtn">
        <v-icon left>mdi-record</v-icon>Go Live
      </v-btn>
    </template>

    <v-card>
      <v-card-title>
        <span class="title font-weight-regular">Create stream</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-text-field id="streamTitleInput" label="Title" color="black" required></v-text-field>
          <v-text-field id="descriptionInput" label="Description" color="black" required></v-text-field>
          <v-switch
            id="isPrivateToggle"
            class="pa-0 mt-5"
            dense
            color="grey darken-2"
            v-model="is_private"
            label="Private stream"
          ></v-switch>
          <v-switch
            v-if="user.role !== 'Student'"
            class="pa-0"
            dense
            color="grey darken-2"
            v-model="is_from_webcam"
            label="From your webcam"
          ></v-switch>
          <v-text-field label="Password" color="black" required v-if="is_private"></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="black darken-1" text @click="start_stream = false">Cancel</v-btn>
        <v-btn
          text
          v-on="on"
          class="font-weight-black"
          @click="user.role === 'Student' || is_from_webcam ? startStream() : select_class = true"
        >Continue</v-btn>

        <v-dialog v-model="select_class" max-width="780px">
          <v-card>
            <v-card-title>
              <span class="title font-weight-regular">Setup</span>
            </v-card-title>
            <v-card-text>
              <p class="my-2">Where are you streaming from?</p>
              <v-select
                :items="devices"
                v-model="selectedDevice"
                :menu-props="{ maxHeight: '200' }"
                label="Select a class"
                solo
              ></v-select>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="black darken-1" text @click="select_class = false">Cancel</v-btn>
              <v-dialog v-model="select_classes" max-width="800px">
                <template v-slot:activator="{ on }">
                  <v-btn text v-on="on" class="font-weight-black">Continue</v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="title font-weight-regular">Setup</span>
                  </v-card-title>
                  <v-card-text>
                    <p class="my-2">Would you like to cast the stream to other rooms?</p>
                    <div class="checkboxes_overflow">
                      <v-checkbox
                        v-for="classroom in classes_cast"
                        :key="classroom.name"
                        class="mb-0 pb-0"
                        color="black"
                        v-model="classroom.value"
                        :label="classroom.name"
                      ></v-checkbox>
                    </div>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="black darken-1" text @click="select_classes = false">Cancel</v-btn>
                    <v-btn
                      id="startBtn"
                      color="black darken-1"
                      text
                      @click="
                        start_stream = select_class = select_classes = false
                      "
                    >
                      {{
                      classes_cast.filter(
                      classroom => classroom.value == true
                      ).length > 0
                      ? "Yes"
                      : "No"
                      }}
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import backend from "../../Service";
import axios from "axios";
import io from "socket.io-client";

export default {
  data: () => ({
    devices: [],
    socket: io("http://10.10.15.11:5000"),
    selectedDevice: "",
    tag_list: [],
    start_stream: false,
    tags: [
      "#web-apps",
      "#design-patterns",
      "#batch6",
      "#html",
      "#batch8",
      "#batch7"
    ],
    value: false,
    select_class: false,
    select_classes: false,
    classes_cast: [
      { name: "KIT Campus I - Classroom 1", value: false },
      { name: "KIT Campus I - Classroom 2", value: false },
      { name: "KIT Campus I - Classroom 3", value: false },
      { name: "KIT Campus II - Classroom 1", value: false },
      { name: "KIT Campus II - Classroom 2", value: false },
      { name: "KIT Campus II - Classroom 3", value: false }
    ],
    is_conference: false,
    is_private: false,
    streamTitle: "",
    description: "",
    password: "",
    is_from_webcam: false
  }),
  props: {
    user: Object
  },
  methods: {
    async startStream() {
      console.log("HI");
      const stream = await backend.startStream(
        this.streamTitle,
        this.description,
        this.is_private,
        this.password,
        true
      );
      axios.post("http://10.10.15.11:5000/devices/startStreaming", {
        streamTitle: this.streamTitle,
        description: this.description,
        isPrivate: this.is_private,
        deviceId: this.selectedDevice
      });
      axios.post("http://10.10.15.11:5000/devices/startProjecting", {
        deviceIds: [],
        streamBoxId: "meet"
      });
      this.start_stream = false;
      window.location.replace(`/stream/${stream.data.streamCode}`);
    },
    getAvailableDevices() {
      this.socket.on("info", device_info => {
        this.devices = device_info.filter(device => {
          return device.online && device.cameraPlugged && !device.streaming;
        });
      });
    }
  },
  created() {
    this.getAvailableDevices();
  }
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
}

.checkboxes_overflow {
  height: 200px;
  overflow: auto;
}
</style>
