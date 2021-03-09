<template>
  <div class="content__container">
    <section class="buttons">
      <button class="btn-dark" @click="createProject">+ Project</button>
      <!-- Filter button for filtering the state of the current project list -->
      <button class="btn-dark">- Filter</button>
    </section>

    <!-- For each project in filteredProjects, show the right projects -->
    <!-- Loop over the projectInfo component. Properly animate it when adding a new proj -->
    <!-- Clicking a project will GO TO the /summary/projectId to display correct info.
    This way I let the router handle everything instead of a crazy state-router again -->
    <section class="container__items">
      <sidebar-item />
      <sidebar-item />
      <sidebar-item />
    </section>
  </div>
</template>

<script>
import { setterMixin } from "../mixins/modalMixins";
import ProjectFormCreate from "./ProjectFormCreate";
import SidebarItem from "./SidebarItem.vue";
import UserFormSettings from "./UserFormSettings.vue";

export default {
  components: { SidebarItem },
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
.content__container {
  height: 100%;
}

.buttons {
  display: flex;
  flex-flow: row nowrap;
  place-content: space-evenly;
}

.container__items {
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
  margin-top: 10px;
}
</style>
