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
    <modal />
    <router-view class="dashboard" />
  </section>
</template>

<script>
import Controls from "./components/Controls.vue";
import Modal from "./components/Modal.vue";
import Sidebar from "./components/Sidebar.vue";

export default {
  components: { Sidebar, Controls, Modal }
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
  grid-row: 1 /3;
}

.controls {
  grid-column: 2;
  grid-row: 1;
}

.dashboard {
  grid-column: 2;
  grid-row: 2;
}
/* Lay stuff out correctly and when screen size gets so small, auto hide sidebar */
</style>
