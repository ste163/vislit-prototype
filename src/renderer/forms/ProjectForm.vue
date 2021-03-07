// If passing in something we already have, change to edit form
<template>
  <form @submit.prevent="handleSubmit">
    <!-- Separate these into 2 forms with a step 1 & step 2 -->

    <!-- PROJECT FORM -->
    <fieldset>
      <!-- Need to add the 'for' for the labels -->
      <label>Title</label>
      <input type="text" />
    </fieldset>
    <fieldset>
      <!-- OPTIONAL -->
      <!-- Have a handful of default ones, allow user to add their own -->
      <label>Description</label>
      <input type="text" />
    </fieldset>
    <fieldset>
      <label>Start date</label>
      <input type="date" />
    </fieldset>

    <!-- GOAL FORM -->
    <!-- Word count goal per day -->
    <!-- Goal Frequency (daily, weekly, monthly) -->
    <button type="submit">Save</button>
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

<style></style>
