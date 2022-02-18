import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export type StoreState = {
  snackbar: boolean;
  text: string;
};

export default new Vuex.Store<StoreState>({
  state: {
    snackbar: false,
    text: "",
  },
  mutations: {
    showSnack(state: StoreState, text: string) {
      state.snackbar = true;
      state.text = text;
    },
  },
  actions: {},
  modules: {},
});
