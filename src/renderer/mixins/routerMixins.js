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
        this.$router.replace({ path: `/${route}/${this.selectedProject.id}` });
      }
    },
    changeRouteWithItem(item, route) {
      if (item.id === undefined) {
        this.$router.replace({ path: `/${route}` });
      } else {
        this.$router.replace({ path: `/${route}/${item.id}` });
      }
    },
    selectItem(item, getSelectedItem) {
      getSelectedItem(item.id);
      this.changeRouteWithItem(item, "summary");
    }
  }
};
