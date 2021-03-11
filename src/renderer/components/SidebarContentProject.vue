<template>
  <div>
    <section class="sidebar-content__buttons">
      <button class="btn-dark" @click="createProject">+ Project</button>
      <!-- Filter button for filtering the state of the current project list -->
      <button class="btn-dark">- Filter</button>
    </section>

    <!-- For each project in filteredProjects, show the right projects -->
    <!-- Loop over the projectInfo component. Properly animate it when adding a new proj -->
    <!-- Clicking a project will GO TO the /summary/projectId to display correct info.
    This way I let the router handle everything instead of a crazy state-router again -->
    <section class="sidebar-content__items">
      <sidebar-item :item="allProjects" />
      <sidebar-item-header />
      <transition-group name="transition-items">
        <sidebar-item
          v-for="project in projects"
          :key="project.id"
          :item="project"
        />
      </transition-group>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { setterMixin } from "../mixins/modalMixins";
import ProjectFormCreate from "./ProjectFormCreate";
import SidebarItem from "./SidebarItem.vue";
import SidebarItemHeader from "./SidebarItemHeader.vue";
import UserFormSettings from "./UserFormSettings.vue";

export default {
  components: { SidebarItem, SidebarItemHeader },
  data() {
    return {
      allProjects: {
        id: "",
        title: "All",
        description: "See information on all projects"
      }
    };
  },
  mixins: [setterMixin],
  methods: {
    createProject() {
      this.setModal("Form", ProjectFormCreate);
    },
    openSettings() {
      this.setModal("Form", UserFormSettings);
    }
  },
  computed: {
    ...mapState(["projects"])
  }
};
</script>

<style scoped>
.sidebar-content__buttons {
  display: flex;
  flex-flow: row nowrap;
  place-content: space-evenly;
}

.sidebar-content__items {
  display: flex;
  flex-flow: column nowrap;
  margin-top: 10px;
  height: 100%;
}

/* transition-group animations */
.transition-items-move {
  transition: all 0.5s ease;
  overflow-y: auto;
  overflow-x: hidden;
}

.transition-items-enter-active {
  transition: all 0.3s ease;
}

.transition-items-enter {
  transform: translateY(20px);
  opacity: 0;
}
</style>
