<template>
  <section v-if="isProjectFormOpen">
    <h1>Modal</h1>
  </section>
</template>

<script>
import { mapState, mapMutations } from "vuex";
// Will need to take in an isOpen state
export default {
  methods: {
    ...mapState(["isProjectFormOpen"]),
    ...mapMutations(["setProjectFormOpen"]),
    handleClosing() {
      this.setProjectFormOpen(this.isProjectFormOpen, !this.isProjectFormOpen);
    }
  },
  computed: {
    ...mapState(["isProjectFormOpen"])
  }
};
</script>

<style></style>
