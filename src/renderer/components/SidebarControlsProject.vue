<template>
  <sidebar-controls-template
    :handleAdd="createProject"
    :handleFilter="filterProjects"
  >
    <template #addButtonText>
      Project
    </template>
  </sidebar-controls-template>
</template>

<script>
import { setterMixin } from "../mixins/modalMixins";
import SidebarControlsTemplate from "./SidebarControlsTemplate";
import ProjectFormCreate from "./ProjectFormCreate";

export default {
  components: { SidebarControlsTemplate },
  mixins: [setterMixin],
  methods: {
    createProject() {
      this.setModal("Form", ProjectFormCreate);
    },
    filterProjects() {
      console.log("FILTER PROJECTS");
    }
  }
};
</script>

<style></style>
