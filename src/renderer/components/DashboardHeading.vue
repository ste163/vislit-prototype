// Holds the Project Title, Description, Goal, Last updated. Used on every
dashboard view
<template>
  <section>
    <div :key="1" v-if="this.$route.params.id === undefined">
      <h1 class="dashboard__h1">
        All Projects
      </h1>
    </div>

    <div :key="2" v-else>
      <h1 class="dashboard__h1">
        {{ selectedProject.title }}
      </h1>
      <h2>Info about this Project with Id {{ this.$route.params.id }}</h2>
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
  font-size: 2.5rem;
  padding: 0;
  margin: 0;
}
</style>
