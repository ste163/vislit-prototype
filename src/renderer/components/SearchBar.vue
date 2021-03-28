<template>
  <section>
    <!-- Input fields need NO styling. We're going to fake the styling to make the entire item look like an input field -->
    <form @submit.prevent="handleSearch">
      <fieldset class="searchbar">
        <input placeholder="Search..." type="text" v-model="inputValue" />
        <!-- X icon - ONCLICK-CLEAR SEARCH -->
        <!-- Horizontal divider icon -->
        <!-- Magnifiying glass icon - ONCLICK-SEARCH-->
      </fieldset>
    </form>

    <transition name="results-slide">
      <div class="results" v-if="results.length > 0">
        <!-- IF this is being shown, then we need to also have an invisible div covering the entire screen -->
        <!-- it will act as the click event to hide the results container -->
        <!-- also have state of IsResultsContainerActive so it's not fully based on a search term value -->
        <!-- Clicking in the input will always activate the search results container -->
        <transition-group name="result-change">
          <button
            class="btn-none result"
            v-for="result in results"
            :key="result._id"
          >
            {{ result._source.title }}
          </button>
        </transition-group>
      </div>
    </transition>
  </section>
</template>

<script>
export default {
  data() {
    return {
      inputValue: ""
    };
  },
  props: {
    results: Array
  },
  methods: {
    handleSearch() {
      this.$emit("searched", this.inputValue);
    }
  },
  watch: {
    // Whenever the search input changes, run search
    inputValue: function() {
      this.handleSearch();
    }
  }
};
</script>

<style scoped>
.searchbar {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}

.results {
  min-width: 170px;
  position: absolute;
  top: 55px;
  background-color: var(--white);
  border-radius: 20px;
  box-shadow: var(--shadowCentered);
}

.result {
  font-size: 0.9rem;
  letter-spacing: var(--spacingSmaller);
  border-radius: 20px;
  width: 100%;
}

.result:hover {
  background-color: var(--vislitBlue);
  cursor: pointer;
}

/* Transitions */
.results-slide-enter-active,
.results-slide-leave-active {
  transition: all 0.2s;
}

.results-slide-enter,
.results-slide-leave-to {
  margin-top: 40px;
  top: 10px;
  opacity: 0;
}

/* Transition group */
.result-change {
  transition: all 1s;
}

.result-change-enter,
.result-change-leave-to {
  opacity: 0;
  transform: translateY(5px);
}
</style>
