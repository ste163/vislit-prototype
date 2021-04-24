import { generateId } from "../database";

const progressRepository = {
  database: null,

  getByProjectId() {
    console.log("GETTING PROGRESS BY ID");
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
        console.error("Unable to add progress. Error is: ", error);
        return false;
      }
    }
  }
};

export default progressRepository;
