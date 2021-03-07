<template>
  <section class="sidebar__container">
    <h1>VISLIT</h1>
    <!-- Sidebar content changes dynamical based on routes -->
    <!-- When on Summary page, show Projects, when on Graphs & Progress, auto-minimize -->
    <!-- When on Notes, show a list of notes for that project -->
    <h2>Projects</h2>
    <div class="buttons">
      <button class="btn-dark" @click="handleOpen">+ Project</button>
      <button class="btn-dark">- Filter</button>
    </div>
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
    ...mapMutations(["setProjectFormOpen"]),
    handleOpen() {
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
.sidebar__container {
  display: flex;
  flex-flow: column nowrap;
  color: var(--white);
  background: var(--black);
}

.buttons {
  display: flex;
  flex-flow: row nowrap;
  place-content: space-evenly;
}
</style>
