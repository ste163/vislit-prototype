<template>
  <section class="item__container">
    <h4 class="item__header">Item Title</h4>
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

  transition: all 0.25s;
}

.item__container:hover {
  background-color: var(--vislitBlue);
  color: var(--darkBlack);
  cursor: pointer;
}

.item__header {
  user-select: none;
  font-weight: var(--weightBolder);
  font-size: 0.9em;
  letter-spacing: var(--spacingSmaller);
  margin: 0;
}

.item__details {
  user-select: none;
  margin: 0;
}
</style>
