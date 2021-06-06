export default class ProjectController {
  constructor(projectRepository, searchController) {
    this.projectRepository = projectRepository;
    this.searchController = searchController;
  }

  getAllProjects() {
    // No special checks needed for getAll because it has no params
    // Will always return empty array, so no possible errors
    return this.projectRepository.getAllProjects();
  }

  getProjectById(id) {
    try {
      return this.projectRepository.getProjectById(id);
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  addProject(project) {
    const isProjectTitleTaken = this.projectRepository.getProjectByTitle(
      project.title
    );

    if (isProjectTitleTaken !== undefined) {
      throw new Error("Project title already in database");
    }

    const response = this.projectRepository.addProject(project);

    this.searchController.addProjectToIndex(response);
    return response;
  }

  // Need an EDIT project

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
