import { mapMutations } from "vuex";

export const setterMixin = {
  methods: {
    ...mapMutations(["setIsModalOpen", "setModalType", "setModalContent"]),
    setModal(modalType, modalContent) {
      this.setModalType(modalType);
      this.setModalContent(modalContent);
      this.setIsModalOpen(true);
    }
  }
};
