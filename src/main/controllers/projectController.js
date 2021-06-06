export default class ProjectController {
  constructor(projectRepository, searchController) {
    this.projectRepository = projectRepository;
    this.searchController = searchController;
  }

  getAllProjects() {
    try {
      return this.projectRepository.getAllProjects();
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  getProjectById(id) {
    try {
      const project = this.projectRepository.getProjectById(id);

      if (project === undefined) {
        throw new Error(`Project with id ${id} not in database`);
      }

      return project;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  addProject(project) {
    try {
      const projectInDatabase = this.projectRepository.getProjectByTitle(
        project.title
      );

      // Only add a project if projectInDatabase is undefined
      if (projectInDatabase !== undefined) {
        throw new Error("Project title already in database");
      }

      const response = this.projectRepository.addProject(project);

      this.searchController.addProject(response);
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  // EDIT PROJECT

  deleteProject(id) {
    try {
      const project = this.getProjectById(id);

      if (project === undefined) {
        throw new Error("Project not in database");
      }

      this.projectRepository.deleteProject(id);

      // THEN delete it from the search index

      return true;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}
