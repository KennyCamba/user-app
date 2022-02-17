<template>
  <div>
    <div class="my-4 d-flex justify-space-between">
      <div class="heading-6">Users ({{ totalItems }})</div>
      <v-btn
        elevation="0"
        color="white"
        class="blue--text accent-4"
        v-if="selected.length > 0"
        @click="openEmail"
      >
        <v-icon>mdi-email</v-icon>
        Send a Message
      </v-btn>
    </div>
    <v-data-table
      :headers="headers"
      :items="items"
      :loading="loading"
      selectable-key="id"
      show-select
      :footer-props="{
        itemsPerPageOptions: [5, 10, 20, 100],
      }"
      :items-per-page="itemsPerPage"
      class="elevation-1"
      @update:options="paginate"
      :server-items-length="totalItems"
      @item-selected="onItemSelected"
      @toggle-select-all="onToggleSelectAll"
    >
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
    </v-data-table>
  </div>
</template>
<script lang="ts">
import UserService, { UserDto } from "@/api/userService";
import Vue from "vue";

interface DataType {
  itemsPerPage: number;
  page: number;
  pageCount: number;
  totalItems: number;
  loading: boolean;
  selected: string[];
  headers: unknown[];
  items: UserDto[];
}
export default Vue.extend({
  data(): DataType {
    return {
      itemsPerPage: 5,
      page: 1,
      pageCount: 0,
      totalItems: 0,
      loading: true,
      selected: [],
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
  },
  mounted() {
    this.getAll(this.page, this.itemsPerPage);
  },
});
</script>
<style scoped>
th {
  background-color: #f0f3fe;
}
</style>
