<template>
  <!-- 
  If making any changes to ProjectForm
Ensure those changes are made here
NOTE:
- Updating the data created is not allowed,
so it is not shown.
 -->
  <form class="form" @submit.prevent="handleSubmit">
    <h3 class="form__h3">Create Project</h3>
    <fieldset>
      <label>Title</label>
      <input required type="text" v-model="form.title" />
    </fieldset>
    <fieldset>
      <label>Description</label>
      <textarea rows="2" v-model="form.description" />
    </fieldset>
    <button class="btn-light btn-form" type="submit">Save</button>
  </form>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      form: {
        title: "",
        description: ""
      }
    };
  },
  computed: {
    ...mapState("projects", ["selectedProject"])
  },
  methods: {
    ...mapActions("projects", ["updateProject"]),
    handleSubmit() {
      this.updateProject(this.form);
    }
  },

  mounted() {
    this.form = {
      title: this.selectedProject.title,
      description: this.selectedProject.description
    };
  }
};
</script>

<style scoped>
.form {
  width: 20rem;
}
</style>
