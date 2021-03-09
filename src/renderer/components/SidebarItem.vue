<template>
  <section class="item__container">
    <h3 class="item__header">Item Title</h3>
    <p class="item__details">Optional info to show</p>
  </section>
</template>

<script>
export default {};
</script>

<style>
.item__container {
  /* Will need to be a grid for placing the 'pinned' icon in correct place */
  display: flex;
  flex-flow: column nowrap;
  background-color: var(--darkGray);
  margin-bottom: 10px;
  padding-left: 10px;
}

.item__header {
  font-weight: var(--weightBolder);
  font-size: 0.9em;
  margin: 0;
}

.item__details {
  margin: 0;
}
</style>
