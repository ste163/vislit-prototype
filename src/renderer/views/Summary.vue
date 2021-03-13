<template>
  <main name="slide" mode="out-in">
    <div class="dashboard__container">
      <!-- Progress -->
      <summary-card>
        <template #heading>
          <h3 class="summary__heading">Progress</h3>
        </template>
        <template #content>
          <p>Enter todays progress</p>
        </template>
        <template #btn-link>
          <button @click="goToProgress">Add ONCLICK!</button>
        </template>
      </summary-card>

      <!-- Visualizations -->
      <summary-card>
        <template #heading>
          <h3 class="summary__heading">Visualizations</h3>
        </template>
        <template #content>
          <p>Progress bar</p>
        </template>
        <template #btn-link>
          <button>Add ONCLICK!</button>
        </template>
        <template #btn-add>
          <button>SAVE</button>
        </template>
      </summary-card>

      <!-- Notes -->
      <summary-card>
        <template #heading>
          <h3 class="summary__heading">Notes</h3>
        </template>
        <template #content>
          <p>Your most recent note for this project</p>
        </template>
        <template #btn-link>
          <button>Add ONCLICK!</button>
        </template>
        <template #btn-add>
          <button>SAVE</button>
        </template>
      </summary-card>

      <!-- Thesaurus -->
      <summary-card>
        <template #heading>
          <h3 class="summary__heading">Thesaurus</h3>
        </template>
        <template #content>
          <p>Thesaurus search bar</p>
        </template>
        <template #btn-link>
          <button>Add ONCLICK!</button>
        </template>
      </summary-card>
    </div>
  </main>
</template>

<script>
import SummaryCard from "./SummaryCard.vue";
export default {
  components: { SummaryCard },
  methods: {
    goToProgress() {
      // push to progress route for this project
      // fetch all progress
    }
  }
};
</script>

<style scoped>
.dashboard__container {
  display: flex;
  flex-flow: row wrap;
}

/* summary-card styling */
.summary__heading {
  text-align: center;
  margin: 0;
  padding: 0;
}

/* transition animations */
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
