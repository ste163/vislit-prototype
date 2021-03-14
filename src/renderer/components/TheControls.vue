<template>
  <section class="controls">
    <div class="controls__container">
      <div>Search bar</div>
      <!-- Search bar component. Need to pass in a what-to-search-for function that has action to mutate Vuex state of what we have selected-->
      <!-- Date filtering drop-downs populated with currently selected projects available dates -->
      <div>
        Date sorting
      </div>
    </div>
    <hr class="controls__hr" />
  </section>
</template>

<script>
export default {};
</script>

<style scoped>
.controls {
  padding-top: 15px;
  width: 95%;
}

.controls__container {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}

.controls__hr {
  background-color: var(--lightGray);
  margin: 15px 0 0 0;
}
</style>
