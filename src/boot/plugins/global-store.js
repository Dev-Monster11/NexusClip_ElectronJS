import { createStore } from "@/runtime/store";

export default ({ Vue }) => {
  return { store: createStore(Vue) };
};
