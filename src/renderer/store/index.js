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
      console.log("PROJECTS RETRIEVED FROM DB", response);
      commit("setProjects", response);
      // TO SET STATE (will already be in json, so don't need to convert)
      // const reviewData = await reviewsRes.json();
      // commit("setMovieReviews", reviewData.results);
    },
    async addProject(payload) {
      // Payload is the project object we want to add
      // FROM REACT PROTOTYPE

      console.log("PROJECT TO ADD", payload);
      const response = await ipcRenderer.invoke("db-projects-add", payload);

      console.log(response);
      if (response) {
        this.getProjects();
      }
      // .then((response) => {
      //   if (response) {
      //     getAllProjects();
      //   } else {
      //     console.log(
      //       'Unable to read database. Need to send signal to Main that an error occurred so I can use the dialog module'
      //     );
      //   }
      // })
    }
  },
  modules: {}
});
