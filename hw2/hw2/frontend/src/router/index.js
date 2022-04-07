import Vue from "vue";
import VueRouter from "vue-router";

import Grid from "@/views/Grid.vue";
import Chart from "@/views/Chart.vue";
Vue.use(VueRouter);

// TODO Web Template Studio: Add routes for your new pages here.
export default new VueRouter({
  mode: "history",
  routes: [
    { path: "/", component: Chart },
    { path: "/grid", component: Grid },
  ]
});
