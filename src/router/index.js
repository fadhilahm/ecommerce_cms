import Vue from "vue";
import VueRouter from "vue-router";
import LandingPage from "@/views/LandingPage";
import DashboardPage from "@/views/DashboardPage";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "LandingPage",
    component: LandingPage
  },
  {
    path: "/products",
    name: "DashboardPage",
    component: DashboardPage
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
