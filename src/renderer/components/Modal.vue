<template>
  <div class="container">
    <transition name="fade">
      <section
        class="background"
        @click="handleClosing"
        v-if="isProjectFormOpen"
      ></section>
    </transition>
    <transition name="slide">
      <section class="card modal">
        <h1>Modal</h1>
      </section>
    </transition>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
// Will need to take in an isOpen state
export default {
  methods: {
    ...mapMutations(["setProjectFormOpen"]),
    handleClosing() {
      const isOpen = !this.isProjectFormOpen;
      this.setProjectFormOpen(isOpen);
    }
  },
  computed: {
    ...mapState(["isProjectFormOpen"])
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
  transform: translateY(-20px);
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
.slide {
}
</style>
