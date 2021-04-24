<!-- Popout menu will be a hover-over and click-based menu
  PopoutMenuTemplate
    - One slot for content
    - Has the Open/Close state passed in as a prop
    - Has the off-click event listener for clicking anywhere outside of pop-out menu
      (unless this is for a isHover then hovering off pop-out will turn it off)
    - popLocation to decide where the menu should pop-out from

  THEN MAKE
  PopoutMenuEllipsis.vue
    - Has specific implementation for the Edit, Delete for Projects
    - Switch for the route to show specifics for Progress, Notes, Etc. if needed
   -->
<template>
  <!-- NEED TO WRAP IN A TRANSITION!! FOR ANIMATING! -->
  <section v-if="this.isOpen" class="popout__container">
    <slot>
      Menu Items Here
    </slot>
  </section>
</template>

<script>
export default {
  props: {
    isOpen: { type: Boolean, required: true }
  }
};
</script>

<style scoped>
.popout__container {
  position: absolute;
  background-color: var(--white);
  border-radius: var(--borderRadius);
  box-shadow: var(--shadowRight);
}

.popout__container > button {
  width: 100%;
  box-shadow: none;
}

.popout__container > button:hover {
  background-color: var(--vislitBlue);
}

.popout__container > button:active {
  background-color: var(--vislitDarkBlue);
  color: var(--white);
}
</style>
