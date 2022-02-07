import Vue from "vue";
import Router from "vue-router";
import HomePage from "@/views/HomePage";
import AboutPage from "@/views/AboutPage";
import ErrorPage from "@/views/ErrorPage";
import CoinDetailPage from "@/views/CoinDetailPage";

Vue.use(Router);

export default new Router({
  mode: "history",

  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/about",
      name: "about",
      component: AboutPage,
    },
    {
      path: "*",
      name: "error",
      component: ErrorPage,
    },
    {
      path: "/coin/:id",
      name: "coin-detail",
      component: CoinDetailPage,
    },
  ],
});
