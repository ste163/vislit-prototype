import Vue from "vue";
import Vuex from "vuex";
import layout from "./modules/layout";
import modal from "./modules/modal";
import projects from "./modules/projects";
import progress from "./modules/progress";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    layout,
    modal,
    projects,
    progress
  }
});
