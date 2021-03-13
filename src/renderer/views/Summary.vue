<template>
  <main name="slide" mode="out-in">
    <dashboard-heading />
  </main>
</template>

<script>
import DashboardHeading from "../components/DashboardHeading.vue";
export default {
  components: { DashboardHeading }
};
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(30%);
  opacity: 0;
}
</style>
