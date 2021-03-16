import { ipcRenderer } from "electron";

const state = () => ({
  projects: [],
  selectedProject: {}
});

const mutations = {
  setProjects(state, payload) {
    state.projects = payload;
  },
  setSelectedProject(state, payload) {
    state.selectedProject = payload;
  }
};

const actions = {
  async getProjects({ commit }) {
    const response = await ipcRenderer.invoke("db-projects-get-all");
    if (response) {
      commit("setProjects", response);
    } else {
      console.log("ERROR WHILE GETTING ALL PROJECTS. RESPONSE WAS:", response);
    }
  },

  async addProject({ dispatch }, project) {
    const response = await ipcRenderer.invoke("db-projects-add", project);
    if (response) {
      dispatch("getProjects");
    } else {
      console.log("ERROR WHILE ADDING PROJECT. RESPONSE WAS:", response);
    }
  },

  async getSelectedProject({ commit }, projectId) {
    console.log(projectId);
    if (projectId === undefined) {
      commit("setSelectedProject", {});
      return;
    }

    const response = await ipcRenderer.invoke(
      "db-projects-get-selected",
      projectId
    );

    if (response) {
      commit("setSelectedProject", response);
    } else {
      console.log(
        "ERROR WHILE GETTING SELECTED PROJECT. RESPONSE WAS:",
        response
      );
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
