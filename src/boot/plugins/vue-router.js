import { createRouter } from "@/runtime/router";

export default ({ Vue }) => {
  return { router: createRouter(Vue) };
};
