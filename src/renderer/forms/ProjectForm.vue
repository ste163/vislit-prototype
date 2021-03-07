// If passing in something we already have, change to edit form
<template>
  <form @submit.prevent="handleSubmit">
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
