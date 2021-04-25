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
    // TODO:
    // - check for if a project with that name is already in the database
    // - return the project that was just created instead of a true or false
    try {
      // search for if a project for that name is already in the database
      // if it is NOT in the db, continue
      // else, thrown a very specific error message so we can display a notification

      // Add item to database
      this.database
        .get("projects")
        .push(generateId(project))
        .write();

      // Retrieve that item we just added from the database
      return true;
    } catch (error) {
      console.error("UNABLE TO ADD PROJECT. ERROR IS: ", error);
      return false;
    }
  },

  deleteProject(projectId) {
    // NEED TO GET ALL RELATED PROGRESS FOR PROJECT & DELETE THAT AS WELL!!!
    // WARNING MODAL NEEDS TO BE VERY CLEAR ON EVERYTHING THAT WILL BE DELETED!
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
