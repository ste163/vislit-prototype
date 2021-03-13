<template>
  <main name="slide" mode="out-in" class="dashboard__container">
    <!-- Progress -->
    <view-summary-card>
      <h3 slot="heading" class="summary__heading">Progress</h3>
      <p slot="content">Enter todays progress</p>
      <template #btn-link />
    </view-summary-card>

    <!-- Visualizations -->
    <view-summary-card>
      <h3 slot="heading" class="summary__heading">Visualizations</h3>
      <p slot="content">Progress bar</p>
      <template #btn-link />
      <button slot="btn-add" class="btn-gray">SAVE</button>
    </view-summary-card>

    <!-- Notes -->
    <view-summary-card>
      <h3 slot="heading" class="summary__heading">Notes</h3>
      <p class="content">Your most recent note for this project</p>
      <template #btn-link />
      <button slot="btn-add" class="btn-gray">SAVE</button>
    </view-summary-card>

    <!-- Thesaurus -->
    <view-summary-card>
      <h3 slot="heading" class="summary__heading">Thesaurus</h3>
      <p slot="content">Thesaurus search bar</p>
      <template #btn-link />
    </view-summary-card>
  </main>
</template>

<script>
import { mapState } from "vuex";
import ViewSummaryCard from "./ViewSummaryCard.vue";
export default {
  components: { ViewSummaryCard },
  computed: {
    ...mapState(["selectedProject"])
  },
  methods: {
    goToProgress() {
      // fetch all progress
      // COPIED FROM SidebarItem.vue, maybe make this a mixin
      if (this.selectedProject.id === undefined) {
        this.$router.replace({ path: `/progress` });
      } else {
        this.$router.replace({ path: `/progress/${this.selectedProject.id}` });
      }
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
