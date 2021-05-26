export default class ProjectController {
  constructor(projectRepository, searchController) {
    this.projectRepository = projectRepository;
    this.searchController = searchController;
  }

  addProject(project) {
    const response = this.projectRepository.addProject(project);

    //  "status" is only when an error was thrown
    if ("status" in response) {
      if (response.status === "error") {
        return response; // returns error object we can check for in background.js
      }
    }

    this.searchController.addProjectToIndex(response);
    return response;
  }
}
