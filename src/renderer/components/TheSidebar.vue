<template>
  <section class="sidebar__container">
    <!-- Swap contents based on route -->
    <!-- When on Summary page, show Projects, when on Graphs & Progress, auto-minimize -->
    <!-- When on Notes, show a list of notes for that project -->
    <div class="sidebar__heading">
      <app-logo />
      <h2 class="heading__title">
        <!-- Computed property based on route -->
        PROJECTS
      </h2>
    </div>

    <section class="sidebar__content">
      <!-- /Summary, /Graphs (auto-minimize), /Progress (auto-minize) - show projects -->
      <!-- /Notes - show list of Project's Notes -->
      <!-- /Thesaurus - show list of created Lexicons -->
      <component :is="renderContentPerRoute" />
    </section>

    <button class="btn-dark sidebar__settings" @click="openSettings">
      O Settings
    </button>
    <button class="btn-none arrow__container" @click="handleSidebarOpen">
      <div :class="{ arrow: true, 'arrow--active': isSidebarOpen }"></div>
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
      isSidebarOpen: true,
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
  margin: 0;
}

.sidebar__content {
  flex-grow: 1;
}

.sidebar__settings {
  width: 50%;
  align-self: center;
}

.arrow__container {
  margin-top: 10px;
  background-color: var(--darkBlack);
  height: 50px;
}

.arrow,
.arrow::after,
.arrow::before {
  content: "";
  display: block;
  width: 100%;
  height: 3px;
  border-radius: 3px;
  background-color: var(--white);
  margin: 6px 0px;
  transition: 0.3s;
}

.arrow--active::after {
  background-color: red;
}

.arrow--active::before {
  background-color: blue;
}
</style>
