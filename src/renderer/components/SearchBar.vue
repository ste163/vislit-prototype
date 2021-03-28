<template>
  <section class="searchbar__container">
    <form @submit.prevent="handleSearch">
      <fieldset class="searchbar__fieldset">
        <input
          class="searchbar__input"
          placeholder="Search..."
          type="text"
          v-model="inputValue"
        />
        <button
          type="button"
          class="btn-none x__container"
          @click="clearSearch"
        >
          <div class="icon__x" />
        </button>
        <hr class="search__hr" />
        <button
          type="submit"
          class="btn-none btn-magnifying"
          @click="handleSearch"
        >
          Q
        </button>
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
            @click="selectSearchResult(result)"
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
import { mapActions } from "vuex";
import { pathMixin } from "../mixins/routerMixins";

export default {
  data() {
    return {
      inputValue: ""
    };
  },
  props: {
    results: Array
  },
  mixins: [pathMixin],
  methods: {
    ...mapActions("projects", ["getSelectedProject"]),
    handleSearch() {
      this.$emit("searched", this.inputValue);
    },
    clearSearch() {
      this.inputValue = "";
    },
    selectSearchResult(result) {
      // LATER will need the type of item the result is. Only projects for now
      this.selectItem(result._source, this.getSelectedProject);
      this.clearSearch();
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
.searchbar__container {
  position: absolute;
  background-color: var(--white);
  border-radius: 15px;
  box-shadow: var(--shadowCentered);
}

.searchbar__fieldset {
  padding: 0.2rem 0;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}

.searchbar__input {
  background-color: transparent;
  box-shadow: none;
  padding: 0;
  padding-left: 15px;
}

.search__hr {
  transform: rotate(90deg);
  background-color: var(--lightGray);
  box-shadow: none;
  height: 3.5px;
  margin: 0 5px;
  width: 25px;
}

.btn-magnifying {
  padding: 0;
  margin-right: 15px;
}

.results {
  background-color: var(--white);
  border-radius: var(--borderRadius);
  box-shadow: var(--shadowCentered);
}

.result {
  font-size: 0.9rem;
  letter-spacing: var(--spacingSmaller);
  border-radius: var(--borderRadius);
  width: 100%;
}

.result:hover {
  background-color: var(--vislitBlue);
  cursor: pointer;
}

/* Transitions */
.results-slide-enter-active,
.results-slide-leave-active {
  transition: all 0.15s;
}

.results-slide-enter,
.results-slide-leave-to {
  margin-top: -5px;
  opacity: 0;
}

/* Transition group */
.result-change {
  transition: all 0.1s;
}

.result-change-enter,
.result-change-leave-to {
  opacity: 0;
  transform: translateY(5px);
}
</style>
