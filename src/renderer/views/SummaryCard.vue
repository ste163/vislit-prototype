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
        <button class="arrow__container">
          <div class="arrow"></div>
        </button>
      </slot>
      <slot name="btn-add"></slot>
    </div>
  </section>
</template>

<script>
// Pass in the button onclick events
</script>

<style scoped>
.card__summary {
  flex-basis: 30%;
  display: flex;
  flex-flow: column nowrap;
  margin: 10px;
}

.summary__heading {
  text-align: center;
  margin: 0;
  padding: 0;
}

.summary__buttons {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
}

/* arrow buttons */
.arrow__container {
  display: flex;
  background-color: var(--lightGray);
  height: 50px;
  margin-top: 10px;
  padding: 10px 0;
  padding-right: 30px;
  padding-left: 38px;
  justify-content: flex-end;
  align-items: center;
}

.arrow__container:hover > .arrow::after,
.arrow::before {
  background-color: var(--black);
}

.arrow__container:hover > .arrow::before {
  background-color: var(--black);
}

.arrow__container:hover {
  background-color: var(--lightestGray);
}

.arrow__container:active {
  background-color: var(--black);
}

.arrow::after,
.arrow::before {
  content: "";
  display: block;
  width: 25px;
  height: 4px;
  border-radius: 3px;
  background-color: var(--darkGray);
  margin: 3px 0px;
  transition: 0.3s;
}

.arrow::after {
  transform: rotate(-29deg) translate(-1px, 1px);
}

.arrow::before {
  transform: rotate(-153deg) translate(1px, 1px);
}
</style>
