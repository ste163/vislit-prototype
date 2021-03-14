<template>
  <main name="slide" mode="out-in" class="dashboard__container">
    <!-- Progress -->
    <view-summary-card :goToRoute="goToProgress">
      <h3 slot="heading" class="summary__heading">Progress</h3>
      <p slot="content">Enter todays progress</p>

      <slot name="btn-link" />
    </view-summary-card>

    <!-- Visualizations -->
    <view-summary-card :goToRoute="goToVisualizations">
      <h3 slot="heading" class="summary__heading">Visualizations</h3>
      <p slot="content">Progress bar</p>
      <slot name="btn-link" />
      <button slot="btn-add" class="btn-gray">SAVE</button>
    </view-summary-card>

    <!-- Notes -->
    <view-summary-card :goToRoute="goToNotes">
      <h3 slot="heading" class="summary__heading">Notes</h3>
      <p class="content">Your most recent note for this project</p>
      <slot name="btn-link" />
      <button slot="btn-add" class="btn-gray">SAVE</button>
    </view-summary-card>

    <!-- Thesaurus -->
    <view-summary-card :goToRoute="goToThesaurus">
      <h3 slot="heading" class="summary__heading">Thesaurus</h3>
      <p slot="content">Thesaurus search bar</p>
      <slot name="btn-link" />
    </view-summary-card>
  </main>
</template>

<script>
import { pathMixin } from "../mixins/routerMixins";
import ViewSummaryCard from "./ViewSummaryCard.vue";
export default {
  components: { ViewSummaryCard },
  mixins: [pathMixin],
  methods: {
    goToProgress() {
      // FETCH PROGRESS
      this.changeRoute("progress");
    },
    goToVisualizations() {
      // FETCH PROGRESS
      this.changeRoute("visualizations");
    },
    goToNotes() {
      // FETCH NOTES
      this.changeRoute("notes");
    },
    goToThesaurus() {
      // FETCH COLLECTIONS (will probably need to get these on initial load (at least their names for search bar))
      this.changeRoute("thesaurus");
    }
  }
};
</script>

<style scoped>
.dashboard__container {
  display: flex;
  flex-flow: row wrap;
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
