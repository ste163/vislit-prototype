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
    return this.database.db
      .get("projects")
      .find({ title })
      .value();
  }

  getAllProjects() {
    try {
      return this.database.db.get("projects").value();
    } catch (error) {
      displayGetAllError("projects", error);
      return null;
    }
  }

  getProjectById(id) {
    // TODO: get all linked data (currently just progress)
    try {
      return this.database.db
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

      this.database.db
        .get("projects")
        .push(this.database.generateUniqueId(project))
        .write();

      const addedProject = this._getProjectByTitle(project.title);

      return addedProject;
    } catch (error) {
      // Error is passed up to controller, then frontend
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
      this.database.db
        .get("projects")
        .remove({ id })
        .write();
      return true;
    } catch (error) {
      return error;
    }
  }
}
