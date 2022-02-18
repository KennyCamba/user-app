<template>
  <div>
    <v-navigation-drawer v-model="sidebar" app>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="blue--text text--accent-4"
        >
          <v-list-item link v-for="(item, i) in items" :key="i" :to="item.path">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>{{ item.name }}</v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="white" elevation="0" short>
      <span class="hidden-sm-and-up">
        <v-btn icon @click="sidebar = !sidebar">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </span>
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
          hide-slider
        >
          <v-tab v-for="(item, i) in items" :key="i" :to="item.path">{{
            item.name
          }}</v-tab>
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
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data: () => ({
    items: [
      {
        name: "Dashboard",
        icon: "mdi-view-dashboard",
        path: "/dashboard",
      },
      {
        name: "Users",
        icon: "mdi-account-group",
        path: "/users",
      },
      {
        name: "Reports",
        icon: "mdi-file-chart",
        path: "/reports",
      },
    ],
    sidebar: false,
    group: 0,
  }),
});
</script>
