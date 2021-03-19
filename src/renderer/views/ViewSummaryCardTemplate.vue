<template>
  <section class="card card__summary">
    <h4 class="summary__heading">
      <slot name="heading">
        Summary Heading
      </slot>
    </h4>

    <section class="summary__content">
      <h5 class="content__heading">
        <slot name="content-heading"></slot>
      </h5>
      <div class="content__container">
        <slot name="content">
          <p>Section Content</p>
        </slot>
      </div>
    </section>

    <!-- Buttons are setup differently than above sections because add button is optional -->
    <div class="summary__buttons">
      <button @click="goToRoute" class="btn-gray arrow__container--down">
        <div class="arrow--down" />
      </button>

      <slot @click="handleAdd" name="btn-add"></slot>
    </div>
  </section>
</template>

<script>
export default {
  props: { goToRoute: { type: Function, required: true }, handleAdd: Function }
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
  font-size: 1.2rem;
  font-weight: var(--weightThin);
  text-align: center;
  margin: 0;
  padding: 0;
}

.summary__content {
  margin: 10px 0;
}

.content__heading {
  margin: 0 0 5px 0;
}

.content__container {
}

.summary__buttons {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
}
</style>
