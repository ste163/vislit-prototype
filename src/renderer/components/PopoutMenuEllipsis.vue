<template>
  <popout-menu-template :isOpen="this.isOpen">
    <button @click="handleEdit">Edit</button>
    <button @click="handleDelete">Delete</button>
  </popout-menu-template>
</template>

<script>
import PopoutMenuTemplate from "./PopoutMenuTemplate.vue";
export default {
  props: {
    isOpen: { type: Boolean, required: true }
  },
  components: { PopoutMenuTemplate },
  methods: {
    handleEdit() {
      console.log("EDIT PROJECT");
    },
    handleDelete() {
      console.log("OPEN DELETE MODAL");
    }
  }
};
</script>

<style></style>
