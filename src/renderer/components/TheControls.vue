<template>
  <section class="controls">
    <div class="controls__container">
      <input-search-bar @searched="searchGlobally" />

      <!-- Make a component later -->
      <div class="results" v-if="searchResults.length > 0">
        <p class="result" v-for="result in searchResults" :key="result._id">
          {{ result._source.title }}
        </p>
      </div>

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
  position: absolute;
  top: 55px;
  background-color: var(--white);
  border-radius: 20px;
  padding: 10px;
}

.result {
  margin: 0;
}
</style>
