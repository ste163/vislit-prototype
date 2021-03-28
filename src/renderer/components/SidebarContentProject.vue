// RE-WRITE USING SLOTS
<template>
  <section class="sidebar-content__items">
    <sidebar-item
      :item="allProjects"
      :disabled="selectedProject.id === undefined"
      :class="{
        'sidebar-content--active': selectedProject.id === undefined
      }"
    />

    <!-- Headers will be created dynamically from 'filteredProjects' state -->
    <sidebar-item-header />

    <!-- Items created dynamically from 'filteredProjects' state -->
    <transition-group name="transition-items">
      <sidebar-item
        v-for="project in projects"
        @item-selected="selectProject"
        :key="project.id"
        :item="project"
        :disabled="selectedProject.id === project.id"
        :class="{
          'sidebar-content--active': selectedProject.id === project.id
        }"
      />
    </transition-group>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";
import SidebarItem from "./SidebarItem.vue";
import SidebarItemHeader from "./SidebarItemHeader.vue";
import { pathMixin } from "../mixins/routerMixins";

export default {
  components: {
    SidebarItem,
    SidebarItemHeader
  },
  data() {
    return {
      allProjects: {
        id: undefined,
        title: "All",
        description: "See information on all projects"
      }
    };
  },
  mixins: [pathMixin],
  methods: {
    ...mapActions("projects", ["getSelectedProject"]),
    selectProject(item) {
      this.selectItem(item, this.getSelectedProject);
    }
  },
  computed: {
    ...mapState("projects", ["projects", "selectedProject"])
  }
};
</script>

<style scoped>
.sidebar-content__items {
  display: flex;
  flex-flow: column nowrap;
  margin-top: 10px;
  height: 95%;
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
