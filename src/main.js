import Vue from "vue";
import App from "./App.vue";
import router from "@/router/router";
import "@/assets/css/tailwind.css";

import { dollarFilter } from "@/helpers/filters";
import { percentFilter } from "@/helpers/filters";

Vue.config.productionTip = false;

Vue.filter("dollar", dollarFilter);
Vue.filter("percent", percentFilter);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
