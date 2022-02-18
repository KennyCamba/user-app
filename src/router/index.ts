import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Users from "../views/Users.vue";
import Reports from "../views/Reports.vue";
import Dashboard from "../views/Dashboard.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    redirect: "/users",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
  },
  {
    path: "/reports",
    name: "Reports",
    component: Reports,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
