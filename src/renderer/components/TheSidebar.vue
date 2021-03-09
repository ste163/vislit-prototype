<template>
  <section class="sidebar__container">
    <div class="branding">
      <base-logo />
      <h2 class="branding__title">Projects</h2>
    </div>
    <!-- Sidebar content changes dynamical based on routes -->
    <!-- When on Summary page, show Projects, when on Graphs & Progress, auto-minimize -->
    <!-- When on Notes, show a list of notes for that project -->
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
import BaseLogo from "./BaseLogo";

export default {
  components: { BaseLogo },
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
  box-shadow: var(--shadowRight);
  padding: 10px 0;
}

.branding {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  align-self: center;
  margin-bottom: 20px;
}

.branding__title {
  /* font-family: "Noto"; */
  font-weight: var(--weightThin);
  letter-spacing: var(--spacingSmall);
  margin: 0;
}

.buttons {
  display: flex;
  flex-flow: row nowrap;
  place-content: space-evenly;
}
</style>
