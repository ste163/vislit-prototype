<template>
  <header class="sidebar__controls">
    <button
      class="btn-dark plus__container controls__add"
      :class="{ 'controls__add--active': isSidebarMinimized }"
      @click="handleAdd"
    >
      <div class="plus" />
      <transition name="text-minimize">
        <p v-if="!isSidebarMinimized" class="add__text">
          <slot name="addButtonText">ADD TEXT</slot>
        </p>
      </transition>
    </button>

    <transition name="minimize">
      <button
        v-if="!isSidebarMinimized"
        class="btn-dark controls__filter"
        @click="handleFilter"
      >
        <app-icon-filter class="filter__icon" />
        Filter
      </button>
    </transition>
  </header>
</template>

<script>
import { mapState } from "vuex";
import AppIconFilter from "./AppIconFilter";

export default {
  components: { AppIconFilter },
  props: { handleAdd: Function, handleFilter: Function },
  computed: {
    ...mapState("layout", ["isSidebarMinimized"])
  }
};
</script>

<style scoped>
.sidebar__controls {
  display: flex;
  flex-flow: row nowrap;
  place-content: space-evenly;
  margin-bottom: 10px;
}

.controls__add {
  position: absolute;
  margin: 0;
  margin-right: 130px;
  height: 33.08px;
  transition: all 0.6s ease;
  width: 95px;
}

.controls__add--active {
  width: 48px;
  margin: 0;
}

.add__text {
  margin: 0;
  margin-left: 22px;
}

.controls__filter {
  margin-left: 120px;
}

.filter__icon {
  margin: 0 10px 0 5px;
  transition: var(--btnHover);
}

.controls__filter:hover > .filter__icon {
  fill: var(--lightDarkGray);
}

.btn-dark:hover > .sidebar__controls {
  fill: var(--lightDarkGray);
}

/* THESE ARE COPY PASTED FROM SIDEBAR CONTAINER, READ DOCS ON HAVING GLOBAL TRANSITIONS */
/* State transitions */
.minimize-enter-active,
.text-minimize-enter-active {
  transition: all 0.6s ease;
  overflow: hidden;
}

.minimize-enter,
.text-minimize-enter {
  transform: translateX(-15px);
  opacity: 0;
}

.minimize-leave-active,
.text-minimize-leave-active {
  transition: all 0.6s ease;
  overflow: hidden;
}

.minimize-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}

.text-minimize-leave-to {
  transform: translateX(-15px);
  opacity: 0;
}
</style>
