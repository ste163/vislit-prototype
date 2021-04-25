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

export default {
  computed: {
    ...mapState("projects", ["selectedProject"])
  },
  methods: {
    ...mapActions("projects", ["deleteProject"]),
    handleEdit() {
      console.log("EDIT PROJECT", this.selectedProject.id);
    },
    handleDelete() {
      console.log("OPEN DELETE MODAL", this.selectedProject.id);
      this.deleteProject(this.selectedProject.id);
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
