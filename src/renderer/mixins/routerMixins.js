import { mapState } from "vuex";

export const pathMixin = {
  computed: {
    ...mapState("projects", ["selectedProject"])
  },
  methods: {
    changeRoute(route) {
      if (this.selectedProject.id === undefined) {
        this.$router.replace({ path: `/${route}` });
      } else {
        // Check if we're trying to go to the same path, if so, don't allow it
        if (this.$route.path === `/${route}/${this.selectedProject.id}`) {
          return null;
        }
        this.$router.replace({ path: `/${route}/${this.selectedProject.id}` });
      }
    },
    changeRouteWithItem(item, route) {
      if (item.id === undefined) {
        this.$router.replace({ path: `/${route}` });
      } else {
        // Check if we're trying to go to the same path, if so, don't allow it
        if (this.$route.path === `/${route}/${item.id}`) {
          return null;
        }
        this.$router.replace({ path: `/${route}/${item.id}` });
      }
    },
    selectItem(item, getSelectedItem) {
      getSelectedItem(item.id);
      this.changeRouteWithItem(item, "summary");
    }
  }
};
