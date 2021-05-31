import errorMessages from "../errorHandling/errorMessages";
import {
  displayGetAllError,
  displayGetByIdError
} from "../utils/errorsConsole";

export default class ProjectRepository {
  constructor(database) {
    this.database = database;
  }

  _getProjectByTitle(title) {
    // Only use db.chain when you need lodash methods
    return this.database.db.chain
      .get("projects")
      .find({ title })
      .value();
  }

  getAllProjects() {
    try {
      // Use db.data for everything that doesn't require lodash
      return this.database.db.data.projects;
    } catch (error) {
      displayGetAllError("projects", error);
      return null;
    }
  }

  getProjectById(id) {
    // TODO: get all linked data (currently just progress)
    try {
      return this.database.db.chain
        .get("projects")
        .find({ id })
        .value();
    } catch (error) {
      displayGetByIdError("project", error);
      return null;
    }
  }

  addProject(project) {
    try {
      const isProjectInDb = this._getProjectByTitle(project.title);

      if (isProjectInDb !== undefined) {
        throw errorMessages.projectTitleDuplication();
      }

      this.database.db.data.projects.push(
        this.database.generateUniqueId(project)
      );

      this.database.db.write();

      const addedProject = this._getProjectByTitle(project.title);

      return addedProject;
    } catch (error) {
      // Error is passed up to controller, then frontend
      console.log(error);
      return error;
    }
  }

  deleteProject(id) {
    // NOTE:
    // Warning modal needs to be very specific on what will be deleted

    // TODO:
    // get all related project data
    // delete all that data first, in correct order

    try {
      this.database.db.chain
        .get("projects")
        .remove({ id })
        .value();
      return true;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
