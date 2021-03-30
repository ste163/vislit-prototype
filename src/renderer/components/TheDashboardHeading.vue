// Holds the Project Title, Description, Goal, Last updated. Used on every
dashboard view
<template>
  <section>
    <transition name="fade">
      <h1 class="dashboard__h1">
        {{ projectTitle }}
      </h1>
    </transition>

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
    projectTitle() {
      if (this.$route.params.id === undefined) {
        return "All Projects";
      } else {
        return this.selectedProject.title;
      }
    }

    // watch: {
    //   $route(to, from) {
    //     console.log("TO", to);
    //     console.log("FROM", from);
    //     // if (this.$route.params.id) {
    //     //   console.log("SOMETHING HAPPENED???")
    //     // }
    //   }
    // }
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

/* Transition */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s;
  position: absolute;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
