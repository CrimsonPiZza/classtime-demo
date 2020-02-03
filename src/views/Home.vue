<template>
  <div class="px-8 pb-8">
    <v-row class="mt-8 mb-3">
      <h1 class="title">
        <span class="font-weight-regular">Ongoing</span>
        streams
      </h1>
      <v-spacer></v-spacer>
      <v-btn text small>Show more</v-btn>
    </v-row>
    <v-row>
      <v-col v-for="stream in streams" :key="stream.id" :lg="4" :md="6" :xs="12">
        <v-card dark :to="`/stream/${stream.id}`">
          <v-img :src="stream.img_url" class="white--text align-end" height="240px">
            <v-card-title v-text="stream.title"></v-card-title>
            <v-card-subtitle v-text="stream.author"></v-card-subtitle>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="mt-8">
      <h1 class="title">
        <span class="font-weight-regular">Previous videos by</span>
        lecturers
      </h1>
      <v-spacer></v-spacer>
      <v-btn text small>Show more</v-btn>
    </v-row>
    <v-row>
      <v-col v-for="video in videos" :key="video.id" :lg="3" :md="4" :xs="12">
        <v-card dark :to="`/stream/${video.title}`">
          <v-img :src="video.img_url" class="white--text align-end" height="210px">
            <v-card-title v-text="video.title"></v-card-title>
            <v-card-subtitle v-text="video.author"></v-card-subtitle>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="mt-8">
      <h1 class="title">
        <span class="font-weight-regular">Videos from the</span>
        community
      </h1>
      <v-spacer></v-spacer>
      <v-btn text small>Show more</v-btn>
    </v-row>
    <v-row>
      <v-col v-for="video in videos" :key="video.id" :lg="3" :md="4" :xs="12">
        <v-card dark :to="`/stream/${video.title}`">
          <v-img :src="video.img_url" class="white--text align-end" height="210px">
            <v-card-title v-text="video.title"></v-card-title>
            <v-card-subtitle v-text="video.author"></v-card-subtitle>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import backend from "../Service";
export default {
  data: () => {
    return {
      streams: [],
      videos: [
        {
          id: 1,
          title: "Introduction to Design Patterns",
          author: "Vignesh Manoharan",
          img_url:
            "https://images.unsplash.com/photo-1558979158-65a1eaa08691?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
        },
        {
          id: 2,
          title: "Introduction to Design Patterns",
          author: "Vignesh Manoharan",
          img_url:
            "https://images.unsplash.com/photo-1558979158-65a1eaa08691?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
        },
        {
          id: 3,
          title: "Introduction to Design Patterns",
          author: "Vignesh Manoharan",
          img_url:
            "https://images.unsplash.com/photo-1558979158-65a1eaa08691?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
        },
        {
          id: 4,
          title: "Introduction to Design Patterns",
          author: "Vignesh Manoharan",
          img_url:
            "https://images.unsplash.com/photo-1558979158-65a1eaa08691?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
        }
      ]
    };
  },
  methods: {
    async getcurrentlyStreaming() {
      const streams = await backend.getCurrentlyStreaming();
      streams.data.forEach(stream => {
        this.streams.push({
          id: stream.streamCode,
          title: stream.streamTitle,
          description: stream.description,
          isPrivate: true,
          author: stream.ownerName,
          date: stream.date
        });
      });
    }
  },
  created() {
    this.getcurrentlyStreaming();
  }
};
</script>

<style>
</style>