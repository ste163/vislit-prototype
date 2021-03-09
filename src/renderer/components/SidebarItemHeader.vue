<template>
  <!-- Pass in heading name AND array of items that should go beneath that header -->
  <div class="header__container">
    <h3 class="container__title">Pinned</h3>
    <hr />
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.header__container {
  padding: 0 10px;
}

.container__title {
  user-select: none;
  margin: 5px 0;
}
</style>
