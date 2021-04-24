<template>
  <popout-menu-template>
    <button>Edit</button>
    <button>Delete</button>
  </popout-menu-template>
</template>

<script>
import PopoutMenuTemplate from "./PopoutMenuTemplate.vue";
export default {
  props: {
    isOpen: { type: Boolean, required: true }
  },
  components: { PopoutMenuTemplate }
};
</script>

<style></style>
