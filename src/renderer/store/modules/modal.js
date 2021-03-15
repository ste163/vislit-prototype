// State must return an object, like data()
const state = () => ({
  isModalOpen: false,
  modalType: "",
  modalContent: {}
});

const mutations = {
  setIsModalOpen(state, payload) {
    state.isModalOpen = payload;
  },
  setModalType(state, payload) {
    state.modalType = payload;
  },
  setModalContent(state, payload) {
    state.modalContent = payload;
  }
};

export default {
  namespaced: true,
  state,
  mutations
};
