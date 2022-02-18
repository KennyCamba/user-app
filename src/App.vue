<template>
  <v-app>
    <menu-bar />
    <v-main class="grey lighten-3">
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import MenuBar from "./components/MenuBar.vue";

export default Vue.extend({
  components: { MenuBar },
  name: "App",
});
</script>
