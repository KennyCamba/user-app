<template>
  <user-table />
</template>

<script lang="ts">
import UserTable from "@/components/UserTable.vue";
import Vue from "vue";

export default Vue.extend({
  name: "Home",

  components: {
    UserTable,
  },
});
</script>
