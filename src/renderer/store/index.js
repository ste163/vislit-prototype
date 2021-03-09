import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isModalOpen: false
  },
  mutations: {
    setIsModalOpen(state, payload) {
      state.isModalOpen = payload;
    }
  },
  actions: {},
  modules: {}
});
