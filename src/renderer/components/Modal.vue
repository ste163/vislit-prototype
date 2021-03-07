// Modals take in: - getter/setter for open/close state, - ModalTypeHeader, -
ContentComponent
<template>
  <div class="container">
    <transition name="fade">
      <section
        class="background"
        @click="handleVisibility"
        v-if="this.isOpen"
      ></section>
    </transition>
    <transition name="slide">
      <section v-if="this.isOpen" class="card modal">
        <h1>Modal Type</h1>
        <button>X Close</button>
        <!-- Modal Content goes here -->
      </section>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: Boolean,
    setIsOpen: Function
  },
  methods: {
    handleVisibility() {
      this.setIsOpen(!this.isOpen);
    }
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
  transform: translateY(-15px);
  z-index: 99;
}

/* modal background transition */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
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
