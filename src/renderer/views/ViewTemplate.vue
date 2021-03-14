<template>
  <main>
    <header class="view__header">
      <button
        v-if="!this.$router.currentRoute.path.includes('summary')"
        @click="goToSummary"
        class="btn-gray"
      >
        Up
      </button>
      <h3 class="header__h3">
        <slot name="title">Page Title</slot>
      </h3>
    </header>

    <section class="dashboard__container">
      <slot name="content"></slot>
    </section>
  </main>
</template>

<script>
import { pathMixin } from "../mixins/routerMixins";

export default {
  mixins: [pathMixin],
  methods: {
    goToSummary() {
      this.changeRoute("summary");
    }
  }
};
</script>

<style scoped>
.dashboard__container {
  display: flex;
  flex-flow: row wrap;
}

.view__header {
  display: flex;
  margin: 10px 0;
}

.header__h3 {
  margin: 0;
  margin-left: 10px;
}
</style>
