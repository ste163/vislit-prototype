import { mapMutations } from "vuex";

export const setterMixin = {
  methods: {
    ...mapMutations("modal", [
      "setIsModalOpen",
      "setModalType",
      "setModalContent"
    ]),
    setModal(modalType, modalContent) {
      this.setModalType(modalType);
      this.setModalContent(modalContent);
      this.setIsModalOpen(true);
    }
  }
};
