export default class ProjectController {
  constructor(projectRepository, searchController) {
    this.projectRepository = projectRepository;
    this.searchController = searchController;
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

  // Create a new method that is .getByTitle
  // Because both Add & Update need that
  // Model it on the getById method

  add(project) {
    try {
      const projectInDatabase = this.projectRepository.getByTitle(
        project.title
      );

      // Only add a project if projectInDatabase is undefined
      if (projectInDatabase !== undefined) {
        throw new Error("Project title already in database");
      }

      const response = this.projectRepository.add(project);

      this.searchController.addProject(response);
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  update(project) {
    try {
      const projectToUpdate = this.getById(project.id);

      if (projectToUpdate instanceof Error) {
        return projectToUpdate;
      }

      // CAN NOT Update a project to have the same name as one already in the database

      // Update only certain properties
      projectToUpdate.title = project.title;
      projectToUpdate.description = project.description;
      // NOTE: Add a last updated field?

      // NOTE MADE
      const response = this.projectRepository.update(projectToUpdate);

      // NOT MADE
      // this.searchController.updateProject(response);

      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

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
