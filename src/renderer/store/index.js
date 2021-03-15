import Vue from "vue";
import Vuex from "vuex";
import modal from "./modules/modal";
import projects from "./modules/projects";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    modal,
    projects
  },
  state: {
    isSidebarMinimized: false
  },
  mutations: {
    setIsSidebarMinimized(state, payload) {
      state.isSidebarMinimized = payload;
    }
  }
});
