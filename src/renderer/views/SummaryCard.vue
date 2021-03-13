// Used to dynamically inject & style different summary cards
<template>
  <section class="card">
    <slot name="heading">
      <h3>Summary Heading</h3>
    </slot>
    <slot name="content">
      <p>Section Content. Router Link fetches data for this stuff</p>
    </slot>
    <slot name="btn-link">
      <button>Link</button>
    </slot>
    <slot name="btn-add"></slot>
  </section>
</template>

<style></style>
