// Holds the Project Title, Description, Goal, Last updated. Used on every
dashboard view
<template>
  <section>
    <div :key="1" v-if="this.$route.params.id === undefined">
      <h1 class="dashboard__h1">
        Summary of all projects (OR LAST UPDATED!)
      </h1>
    </div>

    <div :key="2" v-else>
      <h1 class="dashboard__h1">
        {{ selectedProject.title }}
      </h1>
      <h2>Summary from {{ this.$route.params.id }}</h2>
      <!-- Show all 4 (5 if I add a writing section) of summary cards -->
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["selectedProject"])
  }
};
</script>

<style scoped>
.dashboard__h1 {
  font-family: "Noto";
}
</style>
