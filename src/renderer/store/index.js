import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isProjectFormOpen: false
  },
  mutations: {
    setProjectFormOpen(state, payload) {
      state.isProjectFormOpen = payload;
    }
  },
  actions: {},
  modules: {}
});
