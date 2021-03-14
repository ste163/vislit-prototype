// RE-WRITE USING SLOTS
<template>
  <div>
    <section class="sidebar-content__buttons">
      <button class="btn-dark plus__container" @click="createProject">
        <div class="plus" />
        Project
      </button>
      <!-- Filter button for filtering the state of the current project list -->
      <button class="btn-dark">
        <app-icon-filter class="sidebar__filter" />
        Filter
      </button>
    </section>

    <!-- NEED TO SET selectedProject state in Vuex on button click. That way these checks will be based on that instead of routes -->
    <section class="sidebar-content__items">
      <sidebar-item
        :item="allProjects"
        :disabled="selectedProject.id === undefined"
        :class="{
          'sidebar-content--active': selectedProject.id === undefined
        }"
      />

      <sidebar-item-header />

      <transition-group name="transition-items">
        <sidebar-item
          v-for="project in projects"
          :key="project.id"
          :item="project"
          :disabled="selectedProject.id === project.id"
          :class="{
            'sidebar-content--active': selectedProject.id === project.id
          }"
        />
      </transition-group>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { setterMixin } from "../mixins/modalMixins";
import AppIconFilter from "./AppIconFilter";
import ProjectFormCreate from "./ProjectFormCreate";
import SidebarItem from "./SidebarItem.vue";
import SidebarItemHeader from "./SidebarItemHeader.vue";
import UserFormSettings from "./UserFormSettings.vue";

export default {
  components: { SidebarItem, SidebarItemHeader, AppIconFilter },
  data() {
    return {
      allProjects: {
        id: undefined,
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
    ...mapState(["projects", "selectedProject"])
  }
};
</script>

<style scoped>
.sidebar-content__buttons {
  display: flex;
  flex-flow: row nowrap;
  place-content: space-evenly;
}

.sidebar__filter {
  transition: var(--btnHover);
}

.btn-dark:hover > .sidebar__filter {
  fill: var(--lightDarkGray);
}

.sidebar-content__items {
  display: flex;
  flex-flow: column nowrap;
  margin-top: 10px;
  height: 100%;
}

.sidebar-content--active {
  background: var(--vislitDarkBlue);
  cursor: auto;
}

.sidebar-content--active:hover {
  color: var(--white);
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
