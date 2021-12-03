export const routes = [
  {
    path: "login",
    name: "auth.login",
    component: () =>
      import(
        /* webpackChunkName: "auth-login" */ "@/core/auth/login/LoginController.vue"
      ),
  },
  {
    path: "register",
    name: "auth.registration",
    component: () =>
      import(
        /* webpackChunkName: "auth-registration" */ "@/core/auth/registration/RegistrationController.vue"
      ),
  },
];
