export default class ProjectRepository {
  constructor(database) {
    this.database = database;
  }

  getAll() {
    // This will always at least return an []
    // So no need for undefined check
    return this.database.db.data.projects;
  }

  getById(id) {
    // TODO:
    // get all linked data (currently just progress)
    // Only use db.chain when you need lodash methods
    return this.database.db.chain
      .get("projects")
      .find({ id })
      .value();
  }

  getByTitle(title) {
    return this.database.db.chain
      .get("projects")
      .find({ title })
      .value();
  }

  add(project) {
    this.database.db.data.projects.push(
      this.database.generateUniqueId(project)
    );

    this.database.db.write();

    const addedProject = this.getByTitle(project.title);

    return addedProject;
  }

  delete(id) {
    // NOTE:
    // Warning modal needs to be very specific on what will be deleted

    // TODO:
    // get all related project data
    // delete all that data first, in correct order
    this.database.db.chain
      .get("projects")
      .remove({ id })
      .value();

    this.database.db.write();
  }
}
