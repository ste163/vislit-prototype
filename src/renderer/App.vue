// Will hold sidebar (which means projects will be router-links---NO clicking
changes selectedProj state. OR maybe it is and there are sub routes...), top
controls for searching & date sorting, and the router-view that cycles between
info for all projects on no selected project, summary info on a selected
project, and then "Visualizations", "Notes", "Progress", etc. routes when user
selects any of those
<template>
  <section id="app" class="app__layout">
    <sidebar-container
      :isSidebarMinimized="isSidebarMinimized"
      :class="{ sidebar: true, 'sidebar--minimized': isSidebarMinimized }"
      @sidebar-adjust="adjustLayout"
    />

    <div class="main__container">
      <the-controls class="controls" />

      <transition name="slide">
        <router-view class="dashboard" />
      </transition>
    </div>

    <the-modal />
  </section>
</template>

<script>
import TheControls from "./components/TheControls.vue";
import TheModal from "./components/TheModal.vue";
import SidebarContainer from "./components/SidebarContainer.vue";
import { mapActions } from "vuex";

export default {
  components: { SidebarContainer, TheControls, TheModal },
  data() {
    return {
      isSidebarMinimized: false
    };
  },
  methods: {
    ...mapActions(["getProjects"]),
    adjustLayout() {
      this.isSidebarMinimized = !this.isSidebarMinimized;
    }
  },
  mounted() {
    this.getProjects();
  }
};
</script>

<style>
@import "./global.css";

.app__layout {
  display: flex;
  flex-flow: row nowrap;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}

.sidebar {
  flex-shrink: 0;
  width: 250px;
  transition: all 0.75s ease;
}

.sidebar--minimized {
  width: 50px;
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
