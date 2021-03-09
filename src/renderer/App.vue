// Will hold sidebar (which means projects will be router-links---NO clicking
changes selectedProj state. OR maybe it is and there are sub routes...), top
controls for searching & date sorting, and the router-view that cycles between
info for all projects on no selected project, summary info on a selected
project, and then "Visualizations", "Notes", "Progress", etc. routes when user
selects any of those
<template>
  <section id="app">
    <the-sidebar class="sidebar" />
    <the-controls class="controls" />
    <router-view class="dashboard" />

    <div class="modal">
      <!-- Modal state should be from Vuex store -->
      <!-- Button clicks update Vuex store state -->
      <!-- Then Modal because TheModal -->
      <the-modal :contentComponent="formComponent" :modalType="'Form'" />
    </div>
  </section>
</template>

<script>
import TheControls from "./components/TheControls.vue";
import TheModal from "./components/TheModal.vue";
import TheSidebar from "./components/TheSidebar.vue";
import ProjectFormCreate from "./components/ProjectFormCreate";

export default {
  components: { TheSidebar, TheControls, TheModal },
  data() {
    return {
      formComponent: ProjectFormCreate
    };
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

.modal {
  grid-column: 1 / 3;
  grid-row: 1 / 3;
}
</style>
