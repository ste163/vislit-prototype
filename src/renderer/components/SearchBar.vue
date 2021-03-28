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
          <svg
            width="15.1"
            height="15.1"
            version="1.1"
            viewBox="0 0 4.5244 4.5244"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id="search"
              d="m1.8942 0.0066146c-1.0159 1e-8 -1.8461 0.83069-1.8461 1.8466 6e-8 1.0159 0.83016 1.8482 1.8461 1.8482 0.37298 0 0.72036-0.11323 1.0114-0.30551l1.0281 1.0286a0.3174 0.3174 0 0 0 0.4494 0 0.3174 0.3174 0 0 0 0-0.4494l-1.0156-1.0151c0.23294-0.30942 0.37329-0.69205 0.37329-1.1068 0-1.0159-0.83069-1.8466-1.8466-1.8466zm0 0.65221c0.66386 5e-8 1.1944 0.53055 1.1944 1.1944 0 0.66386-0.53055 1.196-1.1944 1.196-0.66386 0-1.196-0.53211-1.196-1.196 0-0.66386 0.53211-1.1944 1.196-1.1944z"
              color="#000000"
              color-rendering="auto"
              dominant-baseline="auto"
              fill="#484848"
              image-rendering="auto"
              shape-rendering="auto"
              solid-color="#000000"
              stop-color="#000000"
              style="font-feature-settings:normal;font-variant-alternates:normal;font-variant-caps:normal;font-variant-east-asian:normal;font-variant-ligatures:normal;font-variant-numeric:normal;font-variant-position:normal;font-variation-settings:normal;inline-size:0;isolation:auto;mix-blend-mode:normal;shape-margin:0;shape-padding:0;text-decoration-color:#000000;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-orientation:mixed;text-transform:none;white-space:normal"
            />
          </svg>
        </button>
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
  margin: 0 1px 0 5px;
  width: 25px;
}

.btn-magnifying {
  padding: 0;
  padding-top: 1px;
  margin-right: 13px;
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
