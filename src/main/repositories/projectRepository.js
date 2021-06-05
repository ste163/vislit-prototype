export default class ProjectRepository {
  constructor(database, errorMessages) {
    this.database = database;
    this.errorMessages = errorMessages;
  }

  _getProjectByTitle(title) {
    // Only use db.chain when you need lodash methods
    return this.database.db.chain
      .get("projects")
      .find({ title })
      .value();
  }

  getAllProjects() {
    // This will always at least return an []
    // So no need for undefined check
    return this.database.db.data.projects;
  }

  getProjectById(id) {
    // TODO:
    // get all linked data (currently just progress)
    try {
      const project = this.database.db.chain
        .get("projects")
        .find({ id })
        .value();

      if (project === undefined) {
        throw new Error("Project not in database");
      }

      return project;
    } catch (error) {
      this.errorMessages.displayGetByIdError("project", error);
      return null;
    }
  }

  addProject(project) {
    try {
      const isProjectInDb = this._getProjectByTitle(project.title);

      if (isProjectInDb !== undefined) {
        throw this.errorMessages.projectTitleDuplication();
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
      // See if this project is in the database
      // if it is not, throw an error
      // if it is in the database, continue execution

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
