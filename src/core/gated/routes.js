export const routes = [
  {
    path: "",
    name: "gated.overview",
    component: () =>
      import(
        /* webpackChunkName: "gated-overview" */ "@/core/gated/overview/OverviewController.vue"
      ),
  },
];
