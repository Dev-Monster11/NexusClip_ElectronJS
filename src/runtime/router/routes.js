import { routes as authRoutes } from "@/core/auth/routes";
import { routes as gatedRoutes } from "@/core/gated/routes";

export const routes = [
  {
    path: "/",
    name: "gated",
    component: () => import(/* webpackChunkName: "gated" */ "./Gated.vue"),
    redirect: { name: "gated.overview" },
    children: [...gatedRoutes],
  },
  {
    path: "/auth",
    name: "auth",
    component: () => import(/* webpackChunkName: "auth" */ "./Auth.vue"),
    redirect: { name: "auth.login" },
    children: [...authRoutes],
  },
  {
    path: "*",
    name: "not-found",
    component: () => import(/* webpackChunkName: "404" */ "./404.vue"),
  },
];
