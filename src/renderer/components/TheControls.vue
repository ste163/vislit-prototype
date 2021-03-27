<template>
  <section class="controls">
    <div class="controls__container">
      <!-- Need search bar component that has the form submit event at the parent -->
      <input-search-bar @searched="searchGlobally" />
      <!-- Search bar component. Need to pass in a what-to-search-for function that has action to mutate Vuex state of what we have selected-->
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
  components: { InputSearchBar },
  methods: {
    async searchGlobally(query) {
      // Once you get the returned input value, send the search ipc event out
      const response = await ipcRenderer.invoke("search-globally", query);

      if (response) {
        console.log(response);
        // commit("setProjects", response);
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
</style>
