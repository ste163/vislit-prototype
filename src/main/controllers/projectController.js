export default class ProjectController {
  constructor(projectRepository, searchController) {
    this.projectRepository = projectRepository;
    this.searchController = searchController;
  }

  _checkForTitleTaken(title) {
    const project = this.projectRepository.getByTitle(title);

    // Only add/update project if it's undefined
    if (project !== undefined) {
      throw new Error("Project title already in database");
    }

    // Otherwise, continue running code because no error was thrown
  }

  getAll() {
    try {
      return this.projectRepository.getAll();
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  getById(id) {
    try {
      const project = this.projectRepository.getById(id);

      if (project === undefined) {
        throw new Error(`Project with id ${id} not in database`);
      }

      return project;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  add(project) {
    try {
      this._checkForTitleTaken(project.title);

      const response = this.projectRepository.add(project);

      this.searchController.addProject(response);
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  // NEED TESTS:
  // INT & UNIT
  update(project) {
    try {
      const projectToUpdate = this.getById(project.id);

      // Check if project is in database
      if (projectToUpdate instanceof Error) {
        return projectToUpdate;
      }

      // Must get a copy of original project
      // Before its updated, so it can be removed from search index
      const originalProjectForSearch = this.getById(project.id);

      this._checkForTitleTaken(project.title);

      // When here, we're good to update!
      // Update only certain properties
      projectToUpdate.title = project.title;
      projectToUpdate.description = project.description;
      // NOTE: Add a last updated field??? - might be good?

      const updatedProject = this.projectRepository.update(projectToUpdate);

      this.searchController.updateProject(
        originalProjectForSearch,
        updatedProject
      );

      return updatedProject;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  // NEED TO ADD
  // SEARCH CONTROLLER DELETING
  // AND TESTS
  delete(id) {
    try {
      const project = this.getById(id);

      if (project instanceof Error) {
        throw new Error("Project not in database");
      }

      this.projectRepository.delete(id);

      // TODO:
      // Once update is finished:
      // THEN delete project from search index

      return true;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}
