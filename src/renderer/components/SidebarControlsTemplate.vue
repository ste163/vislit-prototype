<template>
  <header class="sidebar-content__buttons">
    <button class="btn-dark plus__container" @click="handleAdd">
      <div class="plus" />
      <slot name="addButtonText">ADD TEXT</slot>
    </button>

    <button v-if="!isSidebarMinimized" class="btn-dark" @click="handleFilter">
      <app-icon-filter class="sidebar__filter" />
      Filter
    </button>
  </header>
</template>

<script>
import { mapState } from "vuex";
import AppIconFilter from "./AppIconFilter";

export default {
  components: { AppIconFilter },
  props: { handleAdd: Function, handleFilter: Function },
  computed: {
    ...mapState(["isSidebarMinimized"])
  }
};
</script>

<style scoped>
.sidebar-content__buttons {
  display: flex;
  flex-flow: row nowrap;
  place-content: space-evenly;
  margin-bottom: 10px;
}

.sidebar__filter {
  margin-right: 5px;
  transition: var(--btnHover);
}

.btn-dark:hover > .sidebar__filter {
  fill: var(--lightDarkGray);
}
</style>
