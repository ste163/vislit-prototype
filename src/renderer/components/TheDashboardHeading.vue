// Holds the Project Title, Description, Goal, Last updated. Used on every
dashboard view
<template>
  <section class="heading__container">
    <h1 class="heading__h1">
      {{ projectTitle }}
    </h1>
    <h2 class="heading__description">
      {{ selectedProject.description }}
    </h2>
    <!-- Only display ellipsis button if it's not All Projects -->
    <button
      v-if="this.$route.params.id !== undefined"
      class="btn-white heading__btn btn-ellipsis"
      @click="openPopout"
    >
      <app-icon-ellipsis />
    </button>
    <!-- Need to make a pop-out component that the button Opens & Closes
    and that I just pass content with functionality into -->
  </section>
</template>

<script>
import { mapState } from "vuex";
import AppIconEllipsis from "./AppIconEllipsis.vue";

export default {
  components: { AppIconEllipsis },
  methods: {
    openPopout() {
      console.log("OPEN POPOUT");
    }
  },
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
.heading__container {
  display: grid;
  width: 95%;
}

.heading__h1 {
  font-family: "Noto";
  font-size: 2.1rem;
  grid-row: 1;
  grid-column: 1;
  padding: 15px 0 0 0;
  margin: 0;
}

.heading__description {
  grid-row: 2;
  grid-column: 1;
  font-size: 1rem;
  margin: 5px 0 0 0;
}

.heading__btn {
  grid-row: 1;
  grid-column: 2;
  place-self: end;
  align-self: baseline;
  margin-top: 15px;
}
</style>
