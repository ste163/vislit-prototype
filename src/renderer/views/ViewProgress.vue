<template>
  <view-template>
    <template #title>
      Progress
    </template>

    <template #content>
      <article>Progress Bar</article>
      <article>Sorted Excel-like Table of Progress</article>
    </template>
  </view-template>

  <!-- Show all progress -->
  <!-- Have a card with a button for going up -->
  <!-- MAYBE have an AppView that uses slots? -->
</template>

<script>
import ViewTemplate from "./ViewTemplate.vue";

export default {
  components: { ViewTemplate }
};
</script>

<style></style>
