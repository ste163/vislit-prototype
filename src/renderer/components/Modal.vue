<template>
  <section class="background" @click="handleClosing" v-if="isProjectFormOpen">
    <h1>Modal</h1>
  </section>
</template>

<script>
import { mapState, mapMutations } from "vuex";
// Will need to take in an isOpen state
export default {
  methods: {
    // ...mapState(["isProjectFormOpen"]),
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
.background {
  background-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
