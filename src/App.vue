<template>
  <v-app>
    <v-app-bar app color="white" elevation="0" dense>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="25"
        />
      </div>
      <template>
        <v-tabs
          class="hidden-xs-only"
          align-with-title
          slider-color="blue accent-4"
          color="blue accent-4"
        >
          <v-tab v-for="(item, i) in items" :key="i">{{ item.name }}</v-tab>
        </v-tabs>
      </template>
      <v-spacer></v-spacer>

      <v-text-field
        placeholder="Search"
        prepend-inner-icon="mdi-magnify"
        outlined
        filled
        dense
        hide-details
      ></v-text-field>
      <v-avatar class="ml-4" color="blue accent-4" size="28">
        <span class="white--text">KC</span>
      </v-avatar>
      <v-btn text elevation="0" depressed class="hidden-xs-only">
        Kenny Camba
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",

  data: () => ({
    items: [
      {
        name: "Dashboard",
      },
      {
        name: "Users",
      },
      {
        name: "Jobs",
      },
    ],
  }),
});
</script>
<style scoped>
div.v-tabs-slider-wrapper {
  top: 0 !important;
}
</style>
