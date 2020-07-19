import Vue from "vue";
import VueRouter from "vue-router";
import TheDashboard from "../components/TheDashboard";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "TheDashboard",
    component: TheDashboard,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
