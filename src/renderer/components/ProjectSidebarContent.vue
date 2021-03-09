<template>
  <div class="buttons">
    <button class="btn-dark" @click="createProject">+ Project</button>
    <!-- Filter button for filtering the state of the current project list -->
    <button class="btn-dark">- Filter</button>
  </div>
  <!-- For each project in filteredProjects, show the right projects -->
  <!-- Loop over the projectInfo component. Properly animate it when adding a new proj -->
  <!-- Clicking a project will GO TO the /summary/projectId to display correct info.
    This way I let the router handle everything instead of a crazy state-router again -->
</template>

<script>
import { setterMixin } from "../mixins/modalMixins";
import ProjectFormCreate from "./ProjectFormCreate";
import UserFormSettings from "./UserFormSettings.vue";

export default {
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

<style></style>
