import Vue from "vue";
import VueRouter from "vue-router";
import ViewSummary from "../views/ViewSummary.vue";

Vue.use(VueRouter);

const routes = [
  // May need to have "/" always redirect to /summary/:projectId
  {
    path: "/",
    redirect: "/summary"
  },
  {
    path: "/summary",
    name: "Summary",
    component: ViewSummary
  },
  {
    path: "/summary/:id",
    name: "Summary by Id",
    component: ViewSummary
  },
  {
    path: "/progress",
    name: "Progress",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ViewProgress.vue")
  },
  {
    path: "/progress/:id",
    name: "Progress by Id",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ViewProgress.vue")
  },
  {
    path: "/visualizations",
    name: "Visualizations",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ViewVisualizations.vue")
  },
  {
    path: "/visualizations/:id",
    name: "Visualizations by Id",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ViewVisualizations.vue")
  },
  {
    path: "/notes",
    name: "Notes",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ViewNotes.vue")
  },
  {
    path: "/notes/:id",
    name: "Notes by Id",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ViewNotes.vue")
  },
  {
    path: "/thesaurus",
    name: "Thesaurus",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ViewThesaurus.vue")
  },
  {
    path: "/thesaurus/:id",
    name: "Thesaurus by Id",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ViewThesaurus.vue")
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
