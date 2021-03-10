<template>
  <!-- Clicking sets the id in route param -->
  <button class="btn-none item__container">
    <h4 class="item__header">Item Title</h4>
    <p class="item__details">Optional info to show</p>
  </button>
</template>

<script>
export default {};
</script>

<style>
.item__container {
  /* Will need to be a grid for placing the 'pinned' icon in correct place */
  display: flex;
  flex-flow: column nowrap;
  color: var(--white);
  background-color: var(--darkGray);
  font-size: 1em;
  margin-bottom: 10px;
  padding-left: 10px;
  overflow-x: hidden;
  transition: all 0.25s;
}

.item__container:hover {
  background-color: var(--vislitBlue);
  color: var(--darkBlack);
}

.item__container:active {
  background-color: var(--vislitDarkBlue);
  color: var(--white);
}

.item__header {
  user-select: none;
  font-weight: var(--weightBolder);
  font-size: 1em;
  letter-spacing: var(--spacingSmaller);
  margin: 0;
}

.item__details {
  user-select: none;
  margin: 0;
}
</style>
