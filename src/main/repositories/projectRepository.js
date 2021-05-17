import errorMessages from "../errorHandling/errorMessages";
import {
  displayAddError,
  displayGetAllError,
  displayGetByIdError,
  displayRemoveError
} from "../utils/errorsConsole";

export default class ProjectRepository {
  constructor(database) {
    this.database = database;
  }

  _isProjectInDb(project) {
    return this.database.db
      .get("projects")
      .find({ title: project.title })
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
        .find({ id: id })
        .value();
    } catch (error) {
      displayGetByIdError("project", error);
      return null;
    }
  }

  addProject(project) {
    try {
      // NOTE: SHOULD I NORMALIZE TITLES? - Title and TITLE can be added to db
      // Check if the name for the project we want to create is already in db
      const isProjectInDb = this._isProjectInDb(project);

      // If the result is not undefined, that title has been taken
      if (isProjectInDb !== undefined) {
        throw errorMessages.projectTitleDuplication();
      }

      // Add item to database
      this.database.db
        .get("projects")
        .push(this.database.generateUniqueId(project))
        .write();

      // Retrieve item we just added from the database
      const addedProject = this._isProjectInDb(project);

      // On the off chance the project didn't get added
      if (addedProject === undefined) {
        throw errorMessages.projectAddFailure();
      }

      return addedProject;
    } catch (error) {
      displayAddError("project", error);
      return error;
    }
  }

  deleteProject(projectId) {
    // TODO: get all related progress & delete that first
    // WARNING MODAL NEEDS TO BE VERY CLEAR ON EVERYTHING THAT WILL BE DELETED!
    try {
      this.database.db
        .get("projects")
        .remove({ id: projectId })
        .write();
      return true;
    } catch (error) {
      displayRemoveError("project", error);
      return false;
    }
  }
}
