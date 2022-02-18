<template>
  <v-app>
    <menu-bar />
    <v-main class="grey lighten-3">
      <v-container fluid>
        <router-view />
        <v-snackbar v-model="snackbar" color="white">
          <div class="black--text">{{ text }}</div>
          <template v-slot:action="{ attrs }">
            <v-btn
              color="blue darken-4"
              text
              v-bind="attrs"
              @click="snackbar = false"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import MenuBar from "./components/MenuBar.vue";
import { StoreState } from "./store";

export default Vue.extend({
  components: { MenuBar },
  name: "App",
  computed: {
    snackbar: {
      get: function (): boolean {
        return (this.$store.state as StoreState).snackbar;
      },
      set: function (value: boolean): void {
        (this.$store.state as StoreState).snackbar = value;
      },
    },
    text() {
      return (this.$store.state as StoreState).text;
    },
  },
});
</script>
