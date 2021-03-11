<template>
  <form class="form" @submit.prevent="handleSubmit">
    <h3 class="form__h3">Settings</h3>

    <fieldset>
      <label>Select default project</label>
      <input required type="text" />
    </fieldset>

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
