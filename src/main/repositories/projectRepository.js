import { generateId } from "../database";

// TODO: Dynamic alert messages based on when these fail
const projectRepository = {
  database: null,

  getAllProjects() {
    try {
      return this.database.get("projects").value();
    } catch (error) {
      console.error("UNABLE TO GET ALL PROJECTS. ERROR IS: ", error);
      return null;
    }
  },

  getProjectById(id) {
    // WILL ALSO NEED TO GET ALL LINKED DATA
    try {
      return this.database
        .get("projects")
        .find({ id: id })
        .value();
    } catch (error) {
      console.error("UNABLE TO GET PROJECT BY ID. ERROR IS: ", error);
      return null;
    }
  },

  // Add does not return a value by default; to ensure it works, return true or false
  addProject(project) {
    // Need to check for if a project with that name is already in the database
    try {
      this.database
        .get("projects")
        .push(generateId(project))
        .write();
      return true;
    } catch (error) {
      console.error("UNABLE TO ADD PROJECT. ERROR IS: ", error);
      return false;
    }
  },

  deleteProject(projectId) {
    // NEED TO GET ALL RELATED PROGRESS FOR PROJECT & DELETE THAT AS WELL!!!
    // WARNING MODAL NEEDS TO BE VERY CLEAR ON EVERYTHING BEING DELETED!
    try {
      this.database
        .get("projects")
        .remove({ id: projectId })
        .write();
      return true;
    } catch (error) {
      console.error("UNABLE TO REMOVE PROJECT. ERROR IS: ", error);
      return false;
    }
  }
};

export default projectRepository;
