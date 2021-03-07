<template>
  <section>
    Sidebar
    <!-- Create projects button that onclick opens modal with create proj form inside. Vuex state change? -->
    <button @click="handleOpen">+ Project</button>
    <!-- Filter button for filtering the state of the current project list -->

    <!-- For each project in filteredProjects, show the right projects -->
    <!-- Loop over the projectInfo component. Properly animate it when adding a new proj -->
    <!-- Clicking a project will GO TO the /summary/projectId to display correct info.
    This way I let the router handle everything instead of a crazy state-router again -->
  </section>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  methods: {
    ...mapState(["isProjectFormOpen"]),
    ...mapMutations(["setProjectFormOpen"]),
    handleOpen() {
      const isOpen = !this.isProjectFormOpen();
      this.setProjectFormOpen(isOpen);
    }
  }
};
</script>

<style scoped>
section {
  color: var(--white);
  background: var(--darkestBlack);
}
</style>
