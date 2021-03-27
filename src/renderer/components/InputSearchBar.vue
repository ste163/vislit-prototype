<template>
  <form @submit.prevent="handleSearch">
    <fieldset class="searchbar">
      <input placeholder="Search..." type="text" v-model="inputValue" />
    </fieldset>
  </form>
</template>

<script>
export default {
  data() {
    return {
      inputValue: ""
    };
  },
  props: {
    searchHandler: Function
  },
  methods: {
    handleSearch() {
      // let query = "";

      // if (this.inputValue.length > 1) {
      //   query = `${this.inputValue} + *`;
      // }

      this.$emit("searched", this.inputValue);
    }
  },
  watch: {
    // Whenever the search input changes, search
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
</style>
