<template>
  <section
    :class="{
      sidebar__container: true,
      'sidebar__container--minimized': isSidebarOpen
    }"
  >
    <!-- Swap contents based on route -->
    <!-- When on Summary page, show Projects, when on Graphs & Progress, auto-minimize -->
    <!-- When on Notes, show a list of notes for that project -->
    <div class="sidebar__heading">
      <app-logo />
      <transition name="heading-minimize">
        <h2 v-if="!isSidebarOpen" class="heading__title">
          <!-- Computed property based on route -->
          PROJECTS
        </h2>
      </transition>
    </div>

    <transition name="minimize">
      <section v-if="!isSidebarOpen" class="sidebar__content">
        <!-- /Summary, /Graphs (auto-minimize), /Progress (auto-minize) - show projects -->
        <!-- /Notes - show list of Project's Notes -->
        <!-- /Thesaurus - show list of created Lexicons -->
        <component :is="renderContentPerRoute" />
      </section>
    </transition>

    <div class="sidebar__spacer" />

    <button class="btn-dark sidebar__settings" @click="openSettings">
      Settings
    </button>

    <button class="btn-none arrow__container" @click="handleSidebarOpen">
      <div :class="{ arrow: true, 'arrow--active': !isSidebarOpen }"></div>
    </button>
  </section>
</template>

<script>
import { setterMixin } from "../mixins/modalMixins";
import AppLogo from "./AppLogo";
import SidebarContentProject from "./SidebarContentProject.vue";
import UserFormSettings from "./UserFormSettings.vue";

export default {
  components: { AppLogo, SidebarContentProject },

  data() {
    // SET DEFAULT VALUES BASED ON USER SETTINGS (WHATEVER THE USER LAST CLICKED ON, IS WHAT YOU SHOW)
    // ALWAYS SAVE THE LAST ROUTE USER WAS AT AND RELOAD THAT VIEW
    return {
      isSidebarOpen: false,
      areDetailsVisibilty: true
    };
  },

  mixins: [setterMixin],

  methods: {
    openSettings() {
      this.setModal("Form", UserFormSettings);
    },
    handleSidebarOpen() {
      this.isSidebarOpen = !this.isSidebarOpen;
      this.$emit("sidebar-adjust", this.isSidebarOpen);
    }
  },

  computed: {
    renderContentPerRoute() {
      const route = this.$route.name;
      // Add a GLOBAL Vuex state check for if it should be minimized
      switch (route) {
        case "Summary":
          return SidebarContentProject;

        default:
          return SidebarContentProject;
      }
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
  padding-top: 10px;
  overflow-y: hidden;
  overflow-x: hidden;
}

.sidebar__container--minimized {
  justify-content: space-between;
}

.sidebar__heading {
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
  user-select: none;
  margin: 0 0 0 46px;
}

.sidebar__content {
  flex-grow: 1;
  overflow-y: auto;
  overflow-x: hidden;
}

.sidebar__spacer {
  flex-grow: 1;
}

.sidebar__settings {
  width: 50%;
  align-self: center;
}

.arrow__container {
  display: flex;
  background-color: var(--darkestGray);
  height: 50px;
  margin-top: 10px;
  padding: 10px 0;
  padding-right: 30px;
  justify-content: flex-end;
  align-items: center;
}

.arrow__container:hover {
  background-color: var(--lightestBlack);
}

.arrow__container:active {
  background-color: var(--lighterBlack);
}

.arrow::after,
.arrow::before {
  content: "";
  display: block;
  width: 25px;
  height: 4px;
  border-radius: 3px;
  background-color: var(--white);
  margin: 3px 0px;
  transition: 0.3s;
}

.arrow::after {
  transform: rotate(-29deg) translate(-1px, 1px);
}

.arrow::before {
  transform: rotate(-153deg) translate(1px, 1px);
}

.arrow--active::after {
  transform: rotate(-145deg) translate(-8px, -1px);
}

.arrow--active::before {
  transform: rotate(-35deg) translate(5px, 3px);
}

/* State transitions */
.minimize-enter-active,
.heading-minimize-enter-active {
  transition: all 0.7s ease;
  overflow: hidden;
  white-space: nowrap;
}

.heading-minimize-enter {
  opacity: 0;
}

.minimize-enter {
  transform: translateX(-30px);
  opacity: 0;
}

.minimize-leave-active,
.heading-minimize-leave-active {
  transition: all 1s ease;
  overflow: hidden;
  white-space: nowrap;
}

.minimize-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}

.heading-minimize-leave-to {
  opacity: 0;
}
</style>
