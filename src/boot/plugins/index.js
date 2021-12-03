/*
 |------------------------------------------------------
 |  Plugins Collection
 |------------------------------------------------------
 |
 | Specify which plugin functions should be added to
 | your Vue application.
 |
 | Warning! Order is very important. When a plugin
 | depends on another one to be initialized, make
 | sure it's mentioned after the one it depends on.
 |
 */
export const plugins = [
  "disable-production-tip",
  "global-store",
  "vue-router",
  "styles",
  "keychain",
  "global-components",
];
