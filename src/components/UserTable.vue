<template>
  <div>
    <v-toolbar flat color="transparent" class="my-2" dense>
      <v-toolbar-title>Users ({{ totalItems }})</v-toolbar-title>
      <v-spacer></v-spacer>
      <div>
        <!-- Dialogo para creae y editar usuarios -->
        <form-dialog
          :dialog="dialog"
          :title="dialogTitle"
          :editedUser="editedItem"
          :loading="dialogLoad"
          @update:dialog="dialog = $event"
          @save="save"
        />
        <!--  -->
        <!-- Dialog para eliminar usuarios -->
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this user?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialogDelete = false"
                >Cancel</v-btn
              >
              <v-btn
                color="blue darken-4"
                text
                @click="deleteUserConfirm"
                :loading="dialogLoad"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!--  -->

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
        <v-icon small @click="deleteUser(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </div>
</template>
<script lang="ts">
import userService from "@/api/userService";
import UserService, { UserDto } from "@/api/userService";
import store from "@/store";
import Vue from "vue";
import FormDialog from "./FormDialog.vue";

const ADD_USER = "Add User";
const EDIT_USER = "Edit User";

interface DataType {
  itemsPerPage: number;
  page: number;
  pageCount: number;
  totalItems: number;
  loading: boolean;
  dialogLoad: boolean;
  dialogDelete: boolean;
  dialog: boolean;
  dialogTitle: string;
  selected: string[];
  headers: unknown[];
  items: UserDto[];
  editedItem: UserDto;
}
export default Vue.extend({
  store: store,
  components: { FormDialog },
  data(): DataType {
    return {
      itemsPerPage: 10,
      page: 1,
      pageCount: 0,
      totalItems: 0,
      loading: true,
      dialogLoad: false,
      dialogDelete: false,
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
    /**
     * @description Obtiene todos los usuarios
     */
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

    /**
     * @description Permite paginar la tabla de usuarios usando el api
     * @param val Valor de la paginación
     */
    paginate(val: { page: number; itemsPerPage: number }): void {
      this.page = val.page;
      this.itemsPerPage = val.itemsPerPage;
      this.getAll(this.page, this.itemsPerPage);
    },

    /**
     * @description Obtiene el avatar de un usuario
     * @param item Usuario
     */
    getAvatar(item: UserDto): string {
      return item.first_name.charAt(0) + item.last_name.charAt(0);
    },

    /**
     * @description Obtiene los emails de los usuarios seleccionados
     */
    onItemSelected(data: { item: UserDto; value: boolean }): void {
      if (data.value) {
        this.selected.push(data.item.email);
      } else {
        this.selected = this.selected.filter(
          (email) => email !== data.item.email,
        );
      }
    },

    /**
     * @description Obtiene los emails de los usuarios seleccionados
     */
    onToggleSelectAll(data: { items: UserDto[]; value: boolean }) {
      if (data.value) {
        this.selected.push(...data.items.map((item) => item.email));
      } else {
        this.selected = this.selected.filter(
          (email) => !data.items.map((item) => item.email).includes(email),
        );
      }
    },

    /**
     * @description Envia un correo a los usuarios seleccionados
     */
    openEmail() {
      window.open(`mailto:${this.selected.join(",")}`);
    },

    /**
     * @description Abre el dialogo para agregar un usuario
     */
    addUser() {
      this.dialogTitle = ADD_USER;
      this.editedItem = {
        id: 0,
        email: "",
        first_name: "",
        last_name: "",
        avatar: "",
      };
      this.dialog = true;
    },
    /**
     * @description Abre el dialogo para editar un usuario
     * @param item Usuario
     */
    editUser(item: UserDto) {
      this.dialogTitle = EDIT_USER;
      this.editedItem = item;
      this.dialog = true;
    },
    /**
     * @description Abre el dialogo para eliminar un usuario
     * @param item Usuario
     */
    deleteUser(item: UserDto) {
      this.dialogDelete = true;
      this.editedItem = item;
    },

    /**
     * @description Crea o actualiza un usuario
     */
    save(user: UserDto) {
      this.dialogLoad = true;
      if (this.dialogTitle == ADD_USER) {
        userService
          .create(user)
          .then((response) => {
            this.items.unshift(response);
            this.totalItems++;
            this.showSnackbar("User created successfully");
          })
          .finally(() => {
            this.dialogLoad = false;
            this.dialog = false;
          });
      } else if (this.dialogTitle == EDIT_USER) {
        userService
          .update(user)
          .then((response) => {
            this.items = this.items.map((item) => {
              if (item.id == user.id) {
                response.id = user.id;
                return response;
              }
              return item;
            });
            this.showSnackbar("User updated successfully");
          })
          .finally(() => {
            this.dialogLoad = false;
            this.dialog = false;
          });
      }
      this.loading = false;
    },

    /**
     * @description Elimina un usuario
     */
    deleteUserConfirm() {
      this.dialogLoad = true;
      userService
        .delete(this.editedItem.id)
        .then(() => {
          this.items = this.items.filter(
            (item) => item.id !== this.editedItem.id,
          );
          this.totalItems--;
          this.showSnackbar("User deleted successfully");
        })
        .finally(() => {
          this.dialogLoad = false;
          this.dialogDelete = false;
        });
    },

    /**
     * @description Muestra un snackbar
     * @param text Texto del snackbar
     */
    showSnackbar(msg: string) {
      this.dialogLoad = false;
      this.$store.commit("showSnack", msg);
    },
  },
  mounted() {
    this.getAll(this.page, this.itemsPerPage);
  },
});
</script>
