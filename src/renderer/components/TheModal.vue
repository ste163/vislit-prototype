// Modals take in: - getter/setter for open/close state, - ModalTypeHeader, -
ContentComponent
<template>
  <div class="container">
    <transition name="fade">
      <section
        class="background"
        @click="handleClose"
        v-if="isModalOpen"
      ></section>
    </transition>
    <transition name="slide">
      <section v-if="isModalOpen" class="card modal">
        <h2 class="modal__type">{{ this.modalType }}</h2>
        <button class="modal__close" @click="handleClose">X</button>
        <component class="modal__content" :is="modalContent" />
      </section>
    </transition>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations(["setIsModalOpen"]),
    handleClose() {
      this.setIsModalOpen(false);
    }
  },
  computed: {
    ...mapState(["isModalOpen", "modalType", "modalContent"])
  }
};
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.background {
  position: absolute;
  width: 100%;
  min-height: 100%;
  overflow-x: hidden;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 98;
}

.modal {
  display: grid;
  grid-gap: 10px;
  transform: translateY(-15px);
  z-index: 99;
}

.modal__type {
  grid-row: 1;
  grid-column: 1;
  margin: 0;
  padding: 0;
  font-size: 1em;
  font-weight: var(--weightLight);
}

.modal__close {
  grid-row: 1;
  grid-column: 2;
  width: min-content;
  justify-self: end;
}

.modal__content {
  grid-row: 2;
  grid-column: 1 / 3;
}

/* modal background transition */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* modal card transition */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateY(15px);
}
</style>
