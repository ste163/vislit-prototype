<template>
  <section class="sidebar__container">
    <!-- Swap contents based on route -->
    <!-- When on Summary page, show Projects, when on Graphs & Progress, auto-minimize -->
    <!-- When on Notes, show a list of notes for that project -->
    <div class="heading">
      <app-logo />
      <h2 class="heading__title">
        <!-- Computed property based on route -->
        PROJECTS
      </h2>
    </div>

    <section>
      <!-- /Summary, /Graphs (auto-minimize), /Progress (auto-minize) - show projects -->
      <!-- /Notes - show list of Project's Notes -->
      <!-- /Thesaurus - show list of created Lexicons -->
      <component :is="renderContentPerRoute" />
    </section>

    <button class="btn-dark" @click="openSettings">O Settings</button>
  </section>
</template>

<script>
import { setterMixin } from "../mixins/modalMixins";
import AppLogo from "./AppLogo";
import TheSidebarProjectContent from "./TheSidebarProjectContent.vue";
import UserFormSettings from "./UserFormSettings.vue";

export default {
  components: { AppLogo, TheSidebarProjectContent },
  mixins: [setterMixin],
  methods: {
    openSettings() {
      this.setModal("Form", UserFormSettings);
    }
  },
  computed: {
    renderContentPerRoute() {
      const route = this.$route.name;
      // Add a GLOBAL Vuex state check for if it should be minimized
      switch (route) {
        case "Summary":
          return TheSidebarProjectContent;

        default:
          return TheSidebarProjectContent;
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
  padding: 10px 0;
}

.heading {
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

.buttons {
  display: flex;
  flex-flow: row nowrap;
  place-content: space-evenly;
}
</style>
