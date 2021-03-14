<template>
  <section>
    <header class="view__header">
      <button @click="goToSummary" class="btn-gray">Up</button>
      <h3 class="header__h3">
        <slot name="title">Page Title</slot>
      </h3>
    </header>

    <main>
      <slot name="content"></slot>
    </main>
  </section>
</template>

<script>
export default {
  methods: {
    goToSummary() {
      console.log("GO!");
    }
  }
};
</script>

<style>
.view__header {
  display: flex;
  margin: 10px 0;
}

.header__h3 {
  margin: 0;
  margin-left: 10px;
}
</style>
