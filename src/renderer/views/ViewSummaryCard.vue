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
        <button @click="goToRoute" class="btn-gray arrow__container">
          <div class="arrow" />
        </button>
      </slot>
      <slot name="btn-add"></slot>
    </div>
  </section>
</template>

<script>
export default {
  props: { goToRoute: { type: Function, required: true } }
};
</script>

<style scoped>
.card__summary {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  flex-basis: 30%;
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
  padding: 10px 0;
  padding-right: 20px;
  padding-left: 20px;
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
  background-color: var(--lightestDarkGray);
}

.arrow__container:active {
  background-color: var(--lightDarkGray);
}

.arrow::after,
.arrow::before {
  content: "";
  display: block;
  width: 20px;
  height: 4px;
  border-radius: 3px;
  background-color: var(--darkGray);
}

.arrow::after {
  transform: rotate(34deg) translate(-6px, 2px);
}

.arrow::before {
  transform: rotate(-35deg) translate(5px, 7px);
}
</style>
