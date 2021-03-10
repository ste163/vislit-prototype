// Will hold sidebar (which means projects will be router-links---NO clicking
changes selectedProj state. OR maybe it is and there are sub routes...), top
controls for searching & date sorting, and the router-view that cycles between
info for all projects on no selected project, summary info on a selected
project, and then "Visualizations", "Notes", "Progress", etc. routes when user
selects any of those
<template>
  <section
    id="app"
    :class="{
      app__layout: true,
      'app__layout--minimized': isSidebarMinimized
    }"
  >
    <!-- APP listens for when the sidebar controls have been clicked -->
    <!-- When clicked, animate grid-template-columns -->
    <the-sidebar class="sidebar" @sidebar-adjust="adjustLayout" />
    <the-controls class="controls" />

    <transition name="slide">
      <router-view class="dashboard" />
    </transition>

    <div class="modal">
      <the-modal />
    </div>
  </section>
</template>

<script>
import TheControls from "./components/TheControls.vue";
import TheModal from "./components/TheModal.vue";
import TheSidebar from "./components/TheSidebar.vue";

export default {
  components: { TheSidebar, TheControls, TheModal },
  data() {
    return {
      isSidebarMinimized: false
    };
  },
  methods: {
    adjustLayout(isAdjusted) {
      this.isSidebarMinimized = isAdjusted;
    }
  }
};
</script>

<style>
@import "./global.css";

/* CHROME 89 DOES NOT SUPPORT grid-template-column ANIMATION! */
/* WILL HAVE TO CHANGE LAYOUT FOR SIDEBAR-DASH TO FLEXBOX */
/* FLEX-GROW ANIMATION WORKS, SUPPOSEDLY */
.app__layout {
  display: grid;
  grid-template-rows: 50px auto;
  grid-template-columns: 250px;
  height: 100vh;
  width: 100%;
  overflow: hidden;

  transition: all 1s;
}

.app__layout--minimized {
  grid-template-columns: 70px;
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

/* Dashboard transition animations */
/* Currently not drilling down and then rising on reverse, will need to add that logic */
/* https://router.vuejs.org/guide/advanced/transitions.html#route-based-dynamic-transition */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.85s;
}

.slide-enter {
  opacity: 0;
  transform: translateY(200px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateY(-200px);
}
</style>
