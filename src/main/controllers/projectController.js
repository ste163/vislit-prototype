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

  // TODO:
  // Edit

  delete(id) {
    try {
      const project = this.getById(id);

      if (project instanceof Error) {
        throw new Error("Project not in database");
      }

      this.projectRepository.delete(id);

      // THEN delete project from search index

      return true;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}
