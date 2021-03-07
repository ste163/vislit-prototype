// Will hold sidebar (which means projects will be router-links---NO clicking
changes selectedProj state. OR maybe it is and there are sub routes...), top
controls for searching & date sorting, and the router-view that cycles between
info for all projects on no selected project, summary info on a selected
project, and then "Visualizations", "Notes", "Progress", etc. routes when user
selects any of those
<template>
  <section id="app">
    <sidebar class="sidebar" />
    <controls class="controls" />
    <router-view class="dashboard" />

    <!-- Container for modals -->
    <div class="modals">
      <!-- MAYBE!!! Just have a single modal whose content changes dynamically for what's in Vuex -->
      <!-- So then each component that needs to call the modal, would just update that Vuex state -->
      <modal
        :contentComponent="formComponent"
        :modalType="'Form'"
        :isOpen="isProjectFormOpen"
        :setIsOpen="setProjectFormOpen"
      />
    </div>
  </section>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Controls from "./components/Controls.vue";
import Modal from "./components/Modal.vue";
import Sidebar from "./components/Sidebar.vue";
import ProjectForm from "./forms/ProjectForm";

export default {
  components: { Sidebar, Controls, Modal },
  data() {
    return {
      formComponent: ProjectForm
    };
  },
  methods: {
    ...mapMutations(["setProjectFormOpen"])
  },
  computed: {
    ...mapState(["isProjectFormOpen"])
  }
};
</script>

<style>
@import "./global.css";

/* #app is a grid holding sidebar, controls, router-view */
#app {
  display: grid;
  grid-template-rows: 50px auto;
  grid-template-columns: 250px auto;
  height: 100%;
  width: 100%;
}

.sidebar {
  grid-column: 1;
  grid-row: 1 / 3;
}

.controls {
  grid-column: 2;
  grid-row: 1;
}

.dashboard {
  grid-column: 2;
  grid-row: 2;
}

.modals {
  grid-column: 1 / 3;
  grid-row: 1 / 3;
}
</style>
