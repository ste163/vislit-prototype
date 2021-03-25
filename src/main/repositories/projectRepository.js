import { generateId } from "../database";

const projectRepository = {
  database: null,

  getAllProjects() {
    // may need to wrap in a try catch, just in case
    return this.database.get("projects").value();
  }
};

export default projectRepository;
