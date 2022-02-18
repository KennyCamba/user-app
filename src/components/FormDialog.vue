<template>
  <v-dialog v-model="dialogModel" max-width="500px" persistent>
    <v-card>
      <v-form ref="form" lazy-validation>
        <v-card-title>
          <span class="text-h5">{{ title }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editedData.first_name"
                  label="Name"
                  :rules="nameRules"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editedData.last_name"
                  label="Last Name"
                  :rules="nameRules"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="editedData.email"
                  label="Email"
                  type="email"
                  :rules="emailRules"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogModel = false">
            Cancel
          </v-btn>
          <v-btn color="blue darken-4" text @click="save" :loading="loading">
            Save
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { UserDto } from "@/api/userService";
import Vue from "vue";

type VForm = Vue & {
  validate: () => boolean;
};

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
    loading: {
      type: Boolean,
      default: () => false,
    },
    editedUser: {
      type: Object,
      default: () => ({
        id: 0,
        email: "",
        first_name: "",
        last_name: "",
        avatar: "",
      }),
    },
  },
  data() {
    return {
      nameRules: [(value: string) => !!value || "Required."],
      emailRules: [
        (value: string) => !!value || "Required.",
        (value: string) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
          "Invalid email address.",
      ],
    };
  },
  methods: {
    save() {
      if ((this.$refs?.form as VForm).validate()) {
        this.$emit("save", this.editedData);
      }
    },
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
    editedData: {
      get: function (): UserDto {
        return { ...this.editedUser };
      },
      set: function (value: UserDto): void {
        this.$emit("update:editedUser", value);
      },
    },
  },
});
</script>
