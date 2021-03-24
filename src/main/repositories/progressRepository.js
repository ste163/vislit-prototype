// Maybe have an "assign database" that happens here.
// So that when we "loadDb" each repo automatically gets assigned the Db instance????
// Might work

const progressRepository = {
  getByProjectId() {
    console.log("GETTING");
  },
  addProgressToProject(progress) {
    console.log("ADDING", progress);
  }
};

export default progressRepository;
