<template>
  <form @submit.prevent="handleSearch">
    <fieldset class="searchbar">
      Q
      <input type="text" v-model="searchInputState" />
    </fieldset>
  </form>
</template>

<script>
export default {
  data() {
    return {
      searchInputState: ""
    };
  },
  props: {
    searchHandler: Function
  },
  methods: {
    handleSearch() {
      this.$emit("searched", this.searchInputState);
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
</style>
