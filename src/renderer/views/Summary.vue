<template>
  <main name="slide" mode="out-in" class="dashboard__container">
    <!-- Progress -->
    <summary-card>
      <h3 slot="heading" class="summary__heading">Progress</h3>
      <p slot="content">Enter todays progress</p>
      <template #btn-link> </template>
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
  </main>
</template>

<script>
import { mapState } from "vuex";
import SummaryCard from "./SummaryCard.vue";
export default {
  components: { SummaryCard },
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
