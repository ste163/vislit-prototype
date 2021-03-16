const state = () => ({
  isSidebarMinimized: false
});

const mutations = {
  setIsSidebarMinimized(state, payload) {
    state.isSidebarMinimized = payload;
  }
};

export default {
  namespaced: true,
  state,
  mutations
};
