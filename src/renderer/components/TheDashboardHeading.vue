// Holds the Project Title, Description, Goal, Last updated. Used on every
dashboard view
<template>
  <section>
    <div v-if="this.$route.params.id === undefined">
      <h1 class="dashboard__h1">
        All Projects
      </h1>
    </div>

    <div v-else>
      <h1 class="dashboard__h1">
        {{ selectedProject.title }}
      </h1>
      <h2 class="dashboard__description">{{ selectedProject.description }}</h2>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("projects", ["selectedProject"])
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
