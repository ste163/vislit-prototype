<template>
  <!-- <svg
    id="icon__search"
    title="magnifying-glass"
    width="15.1"
    height="15.1"
    viewBox="0 0 4.5244 4.5244"
  >
    <path
      id="search__path"
      d="m1.8942 0.0066146c-1.0159 1e-8 -1.8461 0.83069-1.8461 1.8466 6e-8 1.0159 0.83016 1.8482 1.8461 1.8482 0.37298 0 0.72036-0.11323 1.0114-0.30551l1.0281 1.0286a0.3174 0.3174 0 0 0 0.4494 0 0.3174 0.3174 0 0 0 0-0.4494l-1.0156-1.0151c0.23294-0.30942 0.37329-0.69205 0.37329-1.1068 0-1.0159-0.83069-1.8466-1.8466-1.8466zm0 0.65221c0.66386 5e-8 1.1944 0.53055 1.1944 1.1944 0 0.66386-0.53055 1.196-1.1944 1.196-0.66386 0-1.196-0.53211-1.196-1.196 0-0.66386 0.53211-1.1944 1.196-1.1944z"
      fill="#484848"
    />
  </svg> -->

  <svg id="icon__ellipsis" title="ellipsis" height="8" width="32">
    <circle cx="4" cy="4" r="4" fill="#484848" />
    <circle cx="16" cy="4" r="4" fill="#484848" />
    <circle cx="28" cy="4" r="4" fill="#484848" />
  </svg>
</template>

<style>
#icon__ellipsis {
  transition: var(--btnHover);
}

.btn-ellipsis:hover > #icon__ellipsis > circle {
  fill: var(--darkBlack);
}
</style>
