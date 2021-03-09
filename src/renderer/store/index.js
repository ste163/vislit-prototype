import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isModalOpen: false,
    modalType: "",
    modalContent: {}
  },
  mutations: {
    setIsModalOpen(state, payload) {
      state.isModalOpen = payload;
    },
    setModalType(state, payload) {
      state.modalType = payload;
    },
    setModalContent(state, payload) {
      state.modalContent = payload;
    }
  },
  actions: {},
  modules: {}
});
