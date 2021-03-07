// If passing in something we already have, change to edit form
<template>
  <form @submit.prevent="handleSubmit">
    <!-- Separate these into 2 forms with a step 1 & step 2 -->

    <!-- PROJECT FORM -->
    <!-- Project Name -->
    <!-- Type -->
    <!-- Short description -->
    <!-- Start Date -->

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
