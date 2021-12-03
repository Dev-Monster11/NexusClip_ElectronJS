import Vuex from "vuex";

export function createStore(Vue) {
  Vue.use(Vuex);

  return new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {},
  });
}
