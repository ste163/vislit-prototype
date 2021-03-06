// Will hold sidebar (which means projects will be router-links), top controls
for searching & date sorting, and the router-view that cycles between info for
all projects on no selected project, summary info on a selected project, and
then "Visualizations", "Notes", "Progress", etc. routes when user selects any of
those
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
@import "./global.css";
</style>
