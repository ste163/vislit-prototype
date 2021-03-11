import Vue from "vue";
import Vuex from "vuex";
import { ipcRenderer } from "electron";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // Modals
    isModalOpen: false,
    modalType: "",
    modalContent: {},

    // Projects
    projects: [],
    selectedProject: {}
  },
  mutations: {
    // Modals
    setIsModalOpen(state, payload) {
      state.isModalOpen = payload;
    },
    setModalType(state, payload) {
      state.modalType = payload;
    },
    setModalContent(state, payload) {
      state.modalContent = payload;
    },

    // Projects
    setProjects(state, payload) {
      state.projects = payload;
    },
    setSelectedProject(state, payload) {
      state.selectedProject = payload;
    }
  },
  actions: {
    async getProjects({ commit }) {
      const response = await ipcRenderer.invoke("db-projects-get-all");
      if (response) {
        console.log("PROJECTS RETRIEVED FROM DB:", response);
        commit("setProjects", response);
      } else {
        console.log("ERROR WHILE ADDING PROJECT. RESPONSE WAS:", response);
      }
    },
    async addProject({ dispatch }, project) {
      const response = await ipcRenderer.invoke("db-projects-add", project);

      if (response) {
        dispatch("getProjects");
      } else {
        console.log("ERROR WHILE ADDING PROJECT. RESPONSE WAS:", response);
      }
    }
  },
  modules: {}
});
