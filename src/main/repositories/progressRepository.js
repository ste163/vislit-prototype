import { generateId } from "../database";

const progressRepository = {
  database: null,

  getByProjectId() {
    console.log("GETTING");
  },

  addProgressToProject(progress) {
    // On the off chance the projectId is undefined, do not add progress
    if (progress.projectId !== undefined) {
      try {
        this.database
          .get("progress")
          .push(generateId(progress))
          .write();
        return true;
      } catch (error) {
        console.log("Unable to add progress. Error is: ", error);
        return false;
      }
    }
  }
};

export default progressRepository;
