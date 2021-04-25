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

    <!-- Only display popout if it's not All Projects -->
    <popout-menu-template
      v-if="this.$route.params.id !== undefined"
      class="popout__layout"
    >
      <template #popout-btn-icon>
        <app-icon-ellipsis />
      </template>
      <template #popout-content>
        <popout-menu-items-ellipsis />
      </template>
    </popout-menu-template>
  </section>
</template>

<script>
import { mapState } from "vuex";
import AppIconEllipsis from "./AppIconEllipsis.vue";
import PopoutMenuItemsEllipsis from "./PopoutMenuItemsEllipsis.vue";
import PopoutMenuTemplate from "./PopoutMenuTemplate.vue";

export default {
  components: { AppIconEllipsis, PopoutMenuTemplate, PopoutMenuItemsEllipsis },
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

.popout__layout {
  margin-top: 15px;
  position: absolute;
  right: 0;
}
</style>
