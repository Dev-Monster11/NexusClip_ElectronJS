/*
 |------------------------------------------------------
 |  Booting
 |------------------------------------------------------
 |
 | Bootstrap the new Vue application by attaching every
 | piece of functionality we're going to need in app
 | components.
 |
 | You most likely won't need to change this file
 | unless you want to add internationalization
 | or something else that Vue accepts in
 | the costructor options.
 |
 */
import Vue from "vue";
import Vuesax from "vuesax";
import "vuesax/dist/vuesax.css";

import { config as defaultConfig } from "@/runtime/config";

import { attachPlugins } from "./attachPlugins";

export async function boot(config) {
  const { router, store } = await attachPlugins({
    Vue,
    config: {
      ...defaultConfig,
      ...config,
    },
  });

  new Vue({
    router,
    store,
    render: (h) => h("router-view"),
  }).$mount("#app");

  Vue.use(Vuesax, {
    colors: {
      primary: "#5b3cc4",
      success: "rgb(23, 201, 100)",
      danger: "rgb(242, 19, 93)",
      warning: "rgb(255, 130, 0)",
      dark: "rgb(36, 33, 69)",
    },
  });
}
