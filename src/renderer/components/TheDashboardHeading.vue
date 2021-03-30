// Holds the Project Title, Description, Goal, Last updated. Used on every
dashboard view
<template>
  <section>
    <h1 class="dashboard__h1">
      {{ projectTitle }}
    </h1>
    <h2 class="dashboard__description">
      {{ selectedProject.description }}
    </h2>
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("projects", ["selectedProject"]),
    projectTitle: function() {
      if (this.$route.params.id === undefined) {
        return "All Projects";
      } else {
        return this.selectedProject.title;
      }
    }
  }
};
</script>

<style scoped>
.dashboard__h1 {
  font-family: "Noto";
  font-size: 2.1rem;
  padding: 15px 0 0 0;
  margin: 0;
}

.dashboard__description {
  font-size: 1rem;
  margin: 5px 0 0 0;
}
</style>
