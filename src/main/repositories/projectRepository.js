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

  update(project) {
    // Some code duplication from delete & add
    // It's needed because we only should .write()
    // Once we're finished updated
    this.database.db.chain
      .get("projects")
      .remove({ id: project.id })
      .value();

    this.database.db.data.projects.push(project);

    this.database.db.write();

    const updatedProject = this.getById(project.id);

    return updatedProject;
  }

  delete(id) {
    // NOTE:
    // Warning modal needs to be very specific on what will be deleted

    // TODO:
    // get all related project data
    // and delete it
    // Because this is not a legit relational database
    // The ordering does not matter
    this.database.db.chain
      .get("projects")
      .remove({ id })
      .value();

    this.database.db.write();
  }
}
