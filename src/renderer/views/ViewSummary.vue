<template>
  <main name="slide" mode="out-in" class="dashboard__container">
    <!-- Progress -->
    <view-summary-card :goToRoute="goToProgress">
      <template #heading>
        Progress
      </template>

      <template #content>
        <p>Enter todays progress</p>
      </template>
    </view-summary-card>

    <!-- Visualizations -->
    <view-summary-card :goToRoute="goToVisualizations">
      <template #heading>
        Visualizations
      </template>

      <template #content>
        <p>Progress Bar</p>
      </template>

      <button slot="btn-add" class="btn-gray">SAVE</button>
    </view-summary-card>

    <!-- Notes -->
    <view-summary-card :goToRoute="goToNotes">
      <template #heading>
        Notes
      </template>

      <template #content>
        <p>Most recent project notes</p>
      </template>

      <button slot="btn-add" class="btn-gray">SAVE</button>
    </view-summary-card>

    <!-- Thesaurus -->
    <view-summary-card :goToRoute="goToThesaurus">
      <template #heading>
        Thesaurus
      </template>

      <template #content>
        <p>Thesaurus search bar</p>
      </template>

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
