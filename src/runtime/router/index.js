import VueRouter from "vue-router";

import { getAuthenticatedUser } from "@/core/auth/authenticated/services/get-authenticated-user";

import { routes } from "./routes";

export function createRouter(Vue) {
  Vue.use(VueRouter);

  const router = new VueRouter({
    routes,
  });

  router.beforeEach(async (to, from, next) => {
    const user = await getAuthenticatedUser();

    if (to.matched[0].name === "gated" && !user) {
      return next({
        name: "auth",
      });
    }

    if (to.matched[0].name === "auth" && user) {
      return next({
        name: "gated",
      });
    }

    return next();
  });

  return router;
}
