import {
  displayAddError,
  displayGetAllError,
  displayGetByIdError,
  displayRemoveError
} from "../utils/errorsConsole";
import { projAddFail, projTitleDuplication } from "../utils/errorsThrown";

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

  // Add does not return a value by default;
  // to ensure it works, return the object we just added or an error message
  addProject(project) {
    try {
      // NOTE: SHOULD I NORMALIZE TITLES? - Title and TITLE can be added to db
      // Check if the name for the project we want to create is already in db
      const isProjectInDb = this._isProjectInDb(project);

      // If the result is not undefined, that title has been taken
      if (isProjectInDb !== undefined) {
        throw projTitleDuplication();
      }

      // Add item to database
      this.database.db
        .get("projects")
        .push(this.database.generateId(project))
        .write();

      // Retrieve item we just added from the database
      const addedProject = this._isProjectInDb(project);

      // On the off chance the project didn't get added
      if (addedProject === undefined) {
        throw projAddFail();
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
