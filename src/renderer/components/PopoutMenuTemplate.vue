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
  <section>
    Menu!
  </section>
</template>

<script>
export default {};
</script>

<style></style>
