<template>
  <ul class="popout__list">
    <li class="popout__list-item">
      <button class="popout__list-btn" @click="handleEdit">Edit</button>
    </li>
    <li class="popout__list-item">
      <button class="popout__list-btn" @click="handleDelete">Delete</button>
    </li>
  </ul>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { setterMixin } from "../mixins/modalMixins";
import { deletedMessage } from "../utils/ToastMessages";
import ProjectFormEdit from "./ProjectFormEdit";

export default {
  computed: {
    ...mapState("projects", ["selectedProject"])
  },
  mixins: [setterMixin],
  methods: {
    ...mapActions("projects", ["deleteProject"]),
    handleEdit() {
      this.setModal("Edit", ProjectFormEdit);
    },
    handleDelete() {
      const projectTitle = this.selectedProject.title;
      const response = this.deleteProject(this.selectedProject.id);
      if (response) {
        this.$router.replace({ path: `/` });
        console.log("PROJECT TITLE", projectTitle);
        this.$toast.success(deletedMessage(projectTitle, "project"));
      } else {
        console.error("UNABLE TO RE-ROUTE AFTER PROJECT DELETE");
      }
    }
  }
};
</script>

<style>
/* Could be shared for all pop-outs OR placed in the Template */
.popout__list {
  margin: 0;
  padding: 0;
}

.popout__list-item {
  list-style: none;
  margin: 0;
  padding: 0;
}

.popout__list-btn {
  width: 100%;
  box-shadow: none;
}

.popout__list-btn:hover {
  background-color: var(--vislitBlue);
}

.popout__list-btn:active {
  background-color: var(--vislitDarkBlue);
  color: var(--white);
}
</style>
