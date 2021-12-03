import { defaultTheme as theme } from "@/ui/themes/default";

export default ({ Vue }) => {
  import("@/ui/themes/default/index.scss");

  Object.defineProperty(Vue, "$theme", {
    get() {
      return theme;
    },
  });

  Object.defineProperty(Vue.prototype, "$theme", {
    get() {
      return theme;
    },
  });
};
