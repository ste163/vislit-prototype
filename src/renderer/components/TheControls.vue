<template>
  <section class="controls">
    <div class="controls__container">
      <input-search-bar @searched="searchGlobally" />

      <!-- Might best to move results into search-bar component -->
      <transition name="results-slide">
        <div class="results" v-if="searchResults.length > 0">
          <!-- IF this is being shown, then we need to also have an invisible div covering the entire screen -->
          <!-- it will act as the click event to hide the results container -->
          <!-- also have state of IsResultsContainerActive so it's not fully based on a search term value -->
          <!-- Clicking in the input will always activate the search results container -->
          <transition-group name="result-change">
            <button
              class="btn-none result"
              v-for="result in searchResults"
              :key="result._id"
            >
              {{ result._source.title }}
            </button>
          </transition-group>
        </div>
      </transition>

      <!-- Date filtering drop-downs populated with currently selected projects available dates -->
      <div>
        Date sorting
      </div>
    </div>
    <hr class="controls__hr" />
  </section>
</template>

<script>
import { ipcRenderer } from "electron";
import InputSearchBar from "./InputSearchBar.vue";

export default {
  data() {
    return {
      searchResults: []
    };
  },
  components: { InputSearchBar },
  methods: {
    async searchGlobally(query) {
      // Once you get the returned input value, send the search ipc event out
      const response = await ipcRenderer.invoke("search-globally", query);

      if (response) {
        console.log(response);
        this.searchResults = response.hits.hits;
      } else {
        console.log("ERROR WHILE SEARCHING. RESPONSE WAS:", response);
      }
    }
  }
};
</script>

<style scoped>
.controls {
  padding-top: 15px;
  width: 95%;
}

.controls__container {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}

.controls__hr {
  background-color: var(--lightGray);
  margin: 15px 0 0 0;
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
  border-radius: 2px;
  width: 100%;
}

.result:hover {
  border-radius: 20px;
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
