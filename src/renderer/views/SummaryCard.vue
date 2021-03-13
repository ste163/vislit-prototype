// Used to dynamically inject & style different summary cards
<template>
  <section class="card card__summary">
    <slot name="heading">
      <h3>Summary Heading</h3>
    </slot>
    <slot name="content">
      <p>Section Content. Router Link fetches data for this stuff</p>
    </slot>
    <div class="summary__buttons">
      <slot name="btn-link">
        <button>Link</button>
      </slot>
      <slot name="btn-add"></slot>
    </div>
  </section>
</template>

<style scoped>
.card__summary {
  display: flex;
  flex-flow: column nowrap;
  margin: 10px;
}

.summary__buttons {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
}
</style>
