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
      @click="handlePopoutMenu"
    >
      <app-icon-ellipsis />
      <popout-menu-ellipsis :isOpen="this.isEllispsisMenuOpen" />
    </button>
  </section>
</template>

<script>
import { mapState } from "vuex";
import AppIconEllipsis from "./AppIconEllipsis.vue";
import PopoutMenuEllipsis from "./PopoutMenuEllipsis.vue";

export default {
  components: { AppIconEllipsis, PopoutMenuEllipsis },
  data() {
    return {
      isEllispsisMenuOpen: false
    };
  },
  methods: {
    handlePopoutMenu() {
      this.isEllispsisMenuOpen = !this.isEllispsisMenuOpen;
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
  position: relative;
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
  margin-top: 15px;
  position: absolute;
  right: 0;
  /* Inner */
  display: flex;
  flex-flow: column nowrap;
  padding: 0;
}
</style>
