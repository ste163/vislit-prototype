<template>
  <form class="form" @submit.prevent="handleSubmit">
    <h3 class="form__h3">Create Project</h3>
    <!-- Create form holds BOTH Project & Goal forms. A circle indicator at top/bottom of form can show how many steps -->

    <!-- PROJECT FORM -->
    <fieldset>
      <!-- Need to add the 'for' for the labels -->
      <label>Title</label>
      <input required type="text" />
    </fieldset>
    <fieldset>
      <!-- OPTIONAL -->
      <!-- Have a handful of default ones, allow user to add their own -->
      <label>Description</label>
      <textarea />
    </fieldset>
    <fieldset>
      <label>Start date</label>
      <input required type="date" />
    </fieldset>

    <!-- GOAL FORM -->
    <!-- Word count goal per day -->
    <!-- Goal Frequency (daily, weekly, monthly) -->
    <button class="btn-light btn-form" type="submit">Save</button>
  </form>
</template>

<script>
export default {
  methods: {
    handleSubmit() {
      console.log("submitted");
    }
  }
};
</script>

<style scoped>
.form {
  width: 15rem;
}
</style>
