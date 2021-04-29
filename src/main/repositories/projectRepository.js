import { generateId } from "../database";

// TODO: Dynamic alert messages based on when these fail
const projectRepository = {
  database: null,

  // Private repo helpers
  _isProjectInDb(project) {
    return this.database
      .get("projects")
      .find({ title: project.title })
      .value();
  },

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

  // Add does not return a value by default;
  // to ensure it works, return the object we just added or an error message
  addProject(project) {
    try {
      // SHOULD I NORMALIZE THE TITLES? - Title and TITLE can be added to db
      // Check if the name for the project we want to create is already in db
      const isProjectInDb = this._isProjectInDb(project);

      // If the result is not undefined, that title has been taken
      if (isProjectInDb !== undefined) {
        throw "TITLE TAKEN";
      }

      // Add item to database
      this.database
        .get("projects")
        .push(generateId(project))
        .write();

      // Retrieve item we just added from the database
      const addedProject = this._isProjectInDb(project);

      // On the off chance the project didn't get added
      if (addedProject === undefined) {
        throw "PROJECT FAILED TO BE ADDED TO DATABASE";
      }

      return addedProject;
    } catch (error) {
      console.error("UNABLE TO ADD PROJECT. ERROR IS: ", error);
      return error;
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
