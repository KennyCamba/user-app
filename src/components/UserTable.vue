<template>
  <div>
    <v-toolbar flat color="transparent" class="my-2" dense>
      <v-toolbar-title>Users ({{ totalItems }})</v-toolbar-title>
      <v-spacer></v-spacer>
      <div>
        <form-dialog
          :dialog="dialog"
          :title="dialogTitle"
          @update:dialog="dialog = $event"
        />
        <v-btn
          elevation="0"
          color="white"
          class="blue--text text--accent-4"
          @click="addUser"
        >
          <v-icon>mdi-account-plus</v-icon>
          <span class="ml-2 hidden-xs-only"></span>
          <div class="hidden-xs-only">Add User</div>
        </v-btn>
        <v-btn
          elevation="0"
          color="white"
          class="blue--text text--accent-4 ml-2"
          v-if="selected.length > 0"
          @click="openEmail"
        >
          <v-icon>mdi-email</v-icon>
          <span class="ml-2 hidden-xs-only"></span>
          <div class="hidden-xs-only">Send a Message</div>
        </v-btn>
      </div>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="items"
      :loading="loading"
      selectable-key="id"
      checkbox-color="blue accent-4"
      disable-filtering
      disable-sort
      mobile-breakpoint="xs"
      show-select
      :footer-props="{
        itemsPerPageOptions: [5, 10, 20, 100],
      }"
      :items-per-page="itemsPerPage"
      class="elevation-2"
      @update:options="paginate"
      :server-items-length="totalItems"
      @item-selected="onItemSelected"
      @toggle-select-all="onToggleSelectAll"
    >
      <v-toolbar flat></v-toolbar>
      <template v-slot:[`item.avatar`]="{ item }">
        <v-avatar size="36" color="primary">
          <img :src="item.avatar" v-if="item.avatar" />
          <span v-else class="white--text">{{ getAvatar(item) }}</span>
        </v-avatar>
      </template>
      <template v-slot:[`item.email`]="{ item }">
        <a :href="'mailto:' + item.email"
          >{{ item.email }}
          <span> <v-icon small color="blue">mdi-email</v-icon> </span></a
        >
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editUser(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </div>
</template>
<script lang="ts">
import UserService, { UserDto } from "@/api/userService";
import Vue from "vue";
import FormDialog from "./FormDialog.vue";

interface DataType {
  itemsPerPage: number;
  page: number;
  pageCount: number;
  totalItems: number;
  loading: boolean;
  dialog: boolean;
  dialogTitle: string;
  selected: string[];
  headers: unknown[];
  items: UserDto[];
  editedItem: UserDto;
}
export default Vue.extend({
  components: { FormDialog },
  data(): DataType {
    return {
      itemsPerPage: 10,
      page: 1,
      pageCount: 0,
      totalItems: 0,
      loading: true,
      dialog: false,
      dialogTitle: "",
      selected: [],
      editedItem: {
        id: 0,
        email: "",
        first_name: "",
        last_name: "",
        avatar: "",
      },
      headers: [
        {
          text: "Photo",
          sortable: false,
          value: "avatar",
          class: "subtitle-2",
        },
        {
          text: "Name",
          value: "first_name",
          class: "subtitle-2",
        },
        {
          text: "Last name",
          value: "last_name",
          class: "subtitle-2",
        },
        {
          text: "Email",
          value: "email",
          class: "subtitle-2",
        },
        {
          text: "Actions",
          value: "actions",
          class: "subtitle-2",
        },
      ],
      items: [],
    };
  },
  methods: {
    getAll(page: number, limit: number): void {
      this.loading = true;
      UserService.getAll(page, limit)
        .then((response) => {
          this.items = response.data;
          this.totalItems = response.total;
          this.loading = false;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    paginate(val: { page: number; itemsPerPage: number }): void {
      this.page = val.page;
      this.itemsPerPage = val.itemsPerPage;
      this.getAll(this.page, this.itemsPerPage);
    },
    getAvatar(item: UserDto): string {
      return item.first_name.charAt(0) + item.last_name.charAt(0);
    },
    onItemSelected(data: { item: UserDto; value: boolean }): void {
      if (data.value) {
        this.selected.push(data.item.email);
      } else {
        this.selected = this.selected.filter(
          (email) => email !== data.item.email,
        );
      }
    },
    onToggleSelectAll(data: { items: UserDto[]; value: boolean }) {
      if (data.value) {
        this.selected.push(...data.items.map((item) => item.email));
      } else {
        this.selected = this.selected.filter(
          (email) => !data.items.map((item) => item.email).includes(email),
        );
      }
    },
    openEmail() {
      window.open(`mailto:${this.selected.join(",")}`);
    },
    addUser() {
      this.dialogTitle = "Add User";
      this.dialog = true;
    },
    editUser(item: UserDto) {
      this.dialogTitle = "Edit User";
      this.editedItem = item;
      this.dialog = true;
    },
  },
  mounted() {
    this.getAll(this.page, this.itemsPerPage);
  },
});
</script>
