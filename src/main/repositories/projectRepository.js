export default class ProjectRepository {
  constructor(database) {
    this.database = database;
  }

  getAllProjects() {
    // This will always at least return an []
    // So no need for undefined check
    return this.database.db.data.projects;
  }

  getProjectById(id) {
    // TODO:
    // get all linked data (currently just progress)
    // Only use db.chain when you need lodash methods
    return this.database.db.chain
      .get("projects")
      .find({ id })
      .value();
  }

  getProjectByTitle(title) {
    return this.database.db.chain
      .get("projects")
      .find({ title })
      .value();
  }

  addProject(project) {
    this.database.db.data.projects.push(
      this.database.generateUniqueId(project)
    );

    this.database.db.write();

    const addedProject = this.getProjectByTitle(project.title);

    return addedProject;
  }

  deleteProject(id) {
    // NOTE:
    // Warning modal needs to be very specific on what will be deleted

    // TODO:
    // get all related project data
    // delete all that data first, in correct order
    this.database.db.chain
      .get("projects")
      .remove({ id })
      .value();
  }
}
