<template>
  <section class="sidebar__container">
    <div class="heading">
      <app-logo />
      <h2 class="heading__title">PROJECTS</h2>
    </div>
    <!-- Sidebar content changes dynamical based on routes -->
    <!-- When on Summary page, show Projects, when on Graphs & Progress, auto-minimize -->
    <!-- When on Notes, show a list of notes for that project -->
    <div class="buttons">
      <button class="btn-dark" @click="createProject">+ Project</button>
      <button class="btn-dark">- Filter</button>
    </div>
    <!-- Filter button for filtering the state of the current project list -->

    <!-- For each project in filteredProjects, show the right projects -->
    <!-- Loop over the projectInfo component. Properly animate it when adding a new proj -->
    <!-- Clicking a project will GO TO the /summary/projectId to display correct info.
    This way I let the router handle everything instead of a crazy state-router again -->
    <button class="btn-dark" @click="openSettings">O Settings</button>
  </section>
</template>

<script>
import { setterMixin } from "../mixins/modalMixins";
import ProjectFormCreate from "./ProjectFormCreate";
import AppLogo from "./AppLogo";
import UserFormSettings from "./UserFormSettings.vue";

export default {
  components: { AppLogo },
  mixins: [setterMixin],
  methods: {
    createProject() {
      this.setModal("Form", ProjectFormCreate);
    },
    openSettings() {
      this.setModal("Form", UserFormSettings);
    }
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

.heading {
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-end;
  margin-left: 10px;
  margin-bottom: 20px;
}

.heading__title {
  font-family: "Noto";
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
