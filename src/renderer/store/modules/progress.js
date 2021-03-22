import { ipcRenderer } from "electron";

const state = () => ({
  progress: [],
  todaysProgress: null
});

const mutations = {
  setProgress(state, payload) {
    state.progress = payload;
  },
  setTodaysProgress(state, payload) {
    state.todaysProgress = payload;
  }
};

const actions = {
  async getProgressByProjectId({ commit }) {
    // Will need to pass in an Id
    const response = await ipcRenderer.invoke("db-progress-get-by-project-id");
    if (response) {
      commit("setProgress", response);
    } else {
      console.log("ERROR WHILE GETTING ALL PROGRESS. RESPONSE WAS:", response);
    }
  },

  async getTodaysProgressByProjectId({ commit }) {
    // Will need to pass in an Id
    const response = await ipcRenderer.invoke(
      "db-progress-get-todays-by-project-id"
    );
    if (response) {
      commit("setTodaysProgress", response);
    } else {
      console.log("ERROR WHILE GETTING ALL PROGRESS. RESPONSE WAS:", response);
    }
  },

  async addProgress({ dispatch }, progress) {
    console.log(progress);
    const response = await ipcRenderer.invoke("db-progress-add", progress);
    if (response) {
      // Will need to pass in an Id
      dispatch("getProgressByProjectId");
    } else {
      console.log("ERROR WHILE ADDING PROGRESS. RESPONSE WAS:", response);
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
