const progressRepository = {
  database: null,
  getByProjectId() {
    console.log("GETTING");
  },
  addProgressToProject(progress) {
    console.log("ADDING", progress);
  }
};

export default progressRepository;
