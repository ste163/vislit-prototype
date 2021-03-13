<template>
  <main name="slide" mode="out-in">
    <dashboard-heading />

    <summary-card>
      <template #heading>
        <h3>Summary</h3>
      </template>
      <template #content>
        <p>SOME content</p>
      </template>
      <template #btn-link>
        <button>Add ONCLICK!</button>
      </template>
    </summary-card>
  </main>
</template>

<script>
import DashboardHeading from "../components/DashboardHeading.vue";
import SummaryCard from "./SummaryCard.vue";
export default {
  components: { DashboardHeading, SummaryCard }
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
