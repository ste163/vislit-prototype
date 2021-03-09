import Vue from "vue";
import VueRouter from "vue-router";
import Summary from "../views/Summary.vue";

Vue.use(VueRouter);

const routes = [
  // May need to have "/" always redirect to /summary/:projectId
  {
    path: "/",
    name: "Summary",
    component: Summary
  },
  {
    path: "/visualizations",
    name: "Visualizations",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Visualizations.vue")
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
