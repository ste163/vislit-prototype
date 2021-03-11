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
      // NEED ERROR HANDLING
      const response = await ipcRenderer.invoke("db-projects-get-all");
      console.log("PROJECTS RETRIEVED FROM DB:", response);
      commit("setProjects", response);
      // TO SET STATE (will already be in json, so don't need to convert)
      // const reviewData = await reviewsRes.json();
      // commit("setMovieReviews", reviewData.results);
    },
    async addProject({ commit }, payload) {
      // Payload is the project object we want to add
      console.log("COMMIT", commit);
      const response = await ipcRenderer.invoke("db-projects-add", payload);

      if (response) {
        // To get access to the getProjects action, have to do the below nonsense
        this._actions.getProjects[0]();
      } else {
        console.log("ERROR WHILE ADDING PROJECT. RESPONSE WAS:", response);
      }
    }
  },
  modules: {}
});
