<template>
  <main>
    <h1 v-if="this.$route.params.id === undefined">
      Summary of all projects (OR LAST UPDATED!)
    </h1>
    <h1 v-else>Summary from {{ this.$route.params.id }}</h1>
    <!-- Show all 4 (5 if I add a writing section) of summary cards -->
  </main>
</template>

<script>
export default {};
</script>
