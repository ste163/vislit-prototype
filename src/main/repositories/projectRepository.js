export default class ProjectRepository {
  constructor(database) {
    this.database = database;
  }

  _PROJ_NOT_IN_DB = "Project not in database";

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
    const project = this.database.db.chain
      .get("projects")
      .find({ id })
      .value();

    if (project === undefined) {
      throw new Error(this._PROJ_NOT_IN_DB);
    }

    return project;
  }

  addProject(project) {
    const isProjectTitleTaken = this._getProjectByTitle(project.title);

    if (isProjectTitleTaken !== undefined) {
      throw new Error("Project title already in database");
    }

    this.database.db.data.projects.push(
      this.database.generateUniqueId(project)
    );

    this.database.db.write();

    const addedProject = this._getProjectByTitle(project.title);

    return addedProject;
  }

  deleteProject(id) {
    // NOTE:
    // Warning modal needs to be very specific on what will be deleted

    // TODO:
    // get all related project data
    // delete all that data first, in correct order

    const project = this.getProjectById(id);

    if (project === undefined) {
      throw new Error(this._PROJ_NOT_IN_DB);
    }

    this.database.db.chain
      .get("projects")
      .remove({ id })
      .value();
    return true;
  }
}
