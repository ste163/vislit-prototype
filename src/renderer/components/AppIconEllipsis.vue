<template>
  <svg id="icon__ellipsis" title="ellipsis" height="8" width="33">
    <circle cx="4" cy="4" r="4" fill="#484848" />
    <circle cx="16" cy="4" r="4" fill="#484848" />
    <circle cx="28" cy="4" r="4" fill="#484848" />
  </svg>
</template>

<style>
#icon__ellipsis {
  padding: 10px 15px;
  transition: var(--btnHover);
}

.btn-ellipsis:hover > #icon__ellipsis > circle {
  fill: var(--darkBlack);
  transition: var(--btnHover);
}
</style>
