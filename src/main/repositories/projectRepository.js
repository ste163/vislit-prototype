import { generateId } from "../database";

// May need to wrap each method in a try/catch in case there's a problem so I could show a dynamic error alert box
const projectRepository = {
  database: null,

  getAllProjects() {
    return this.database.get("projects").value();
  },

  getProjectById(id) {
    // WILL ALSO NEED TO GET ALL LINKED DATA
    return this.database
      .get("projects")
      .find({ id: id })
      .value();
  },

  addProject(project) {
    // Need to check for if a project with that name is already in the database
    try {
      this.database
        .get("projects")
        .push(generateId(project))
        .write();
      return true;
    } catch (error) {
      console.log("COULD NOT ADD PROJECT. ERROR IS: ", error);
      return false;
    }
  }
};

export default projectRepository;
