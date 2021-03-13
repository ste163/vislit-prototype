<template>
  <main name="slide" mode="out-in">
    <dashboard-heading />

    <!-- Progress -->
    <summary-card>
      <template #heading>
        <h3>Progress</h3>
      </template>
      <template #content>
        <p>Enter todays progress</p>
      </template>
      <template #btn-link>
        <button>Add ONCLICK!</button>
      </template>
    </summary-card>

    <!-- Visualizations -->
    <summary-card>
      <template #heading>
        <h3>Visualizations</h3>
      </template>
      <template #content>
        <p>Progress bar</p>
      </template>
      <template #btn-link>
        <button>Add ONCLICK!</button>
      </template>
    </summary-card>

    <!-- Notes -->
    <summary-card>
      <template #heading>
        <h3>Notes</h3>
      </template>
      <template #content>
        <p>Your most recent note for this project</p>
      </template>
      <template #btn-link>
        <button>Add ONCLICK!</button>
      </template>
    </summary-card>

    <!-- Thesaurus -->
    <summary-card>
      <template #heading>
        <h3>Thesaurus</h3>
      </template>
      <template #content>
        <p>Thesaurus search bar</p>
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
