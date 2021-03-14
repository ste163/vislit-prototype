<template>
  <view-template name="slide" mode="out-in">
    <template #title>
      Summary
    </template>

    <template #content>
      <!-- Progress -->
      <view-summary-card-template :goToRoute="goToProgress">
        <template #heading>
          Progress
        </template>

        <template #content>
          <p>Enter todays progress</p>
        </template>
      </view-summary-card-template>

      <!-- Visualizations -->
      <view-summary-card-template :goToRoute="goToVisualizations">
        <template #heading>
          Visualizations
        </template>

        <template #content>
          <p>Progress Bar</p>
        </template>

        <button slot="btn-add" class="btn-gray">SAVE</button>
      </view-summary-card-template>

      <!-- Notes -->
      <view-summary-card-template :goToRoute="goToNotes">
        <template #heading>
          Notes
        </template>

        <template #content>
          <p>Most recent project notes</p>
        </template>

        <button slot="btn-add" class="btn-gray">SAVE</button>
      </view-summary-card-template>

      <!-- Thesaurus -->
      <view-summary-card-template :goToRoute="goToThesaurus">
        <template #heading>
          Thesaurus
        </template>

        <template #content>
          <p>Thesaurus search bar</p>
        </template>

        <slot name="btn-link" />
      </view-summary-card-template>
    </template>
  </view-template>
</template>

<script>
import { pathMixin } from "../mixins/routerMixins";
import ViewSummaryCardTemplate from "./ViewSummaryCardTemplate.vue";
import ViewTemplate from "./ViewTemplate.vue";
export default {
  components: { ViewSummaryCardTemplate, ViewTemplate },
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
