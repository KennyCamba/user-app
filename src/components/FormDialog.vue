<template>
  <v-dialog v-model="dialogModel" max-width="500px">
    <!-- <template v-slot:activator="{ on, attrs }">
      <v-btn
        elevation="0"
        color="white"
        class="blue--text text--accent-4"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-account-plus</v-icon>
        <span class="ml-2 hidden-xs-only"></span>
        <div class="hidden-xs-only">Add User</div>
      </v-btn>
    </template> -->
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ title }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="editedItem.first_name"
                label="Name"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="editedItem.last_name"
                label="Last Name"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="editedItem.email"
                label="Email"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <!-- <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
        <v-btn color="blue darken-1" text @click="save"> Save </v-btn> -->
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    dialog: {
      type: Boolean,
      default: () => false,
    },
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      editedItem: {
        first_name: "",
        last_name: "",
        email: "",
      },
    };
  },
  computed: {
    dialogModel: {
      get: function (): boolean {
        return this.dialog;
      },
      set: function (value: boolean): void {
        this.$emit("update:dialog", value);
      },
    },
  },
});
</script>
