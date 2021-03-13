<template>
  <main>
    <transition name="slide">
      <dashboard-heading />
    </transition>
  </main>
</template>

<script>
import DashboardHeading from "../components/DashboardHeading.vue";
export default {
  components: { DashboardHeading }
};
</script>

<style scoped>
.slide-enter-active {
  transition: all 0.5s ease;
}

.slide-enter {
  transform: translateX(50px);
  opacity: 0;
}
</style>
