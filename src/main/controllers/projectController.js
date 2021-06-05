export default class ProjectController {
  constructor(projectRepository, searchController) {
    this.projectRepository = projectRepository;
    this.searchController = searchController;
  }

  // MOVE TRY/CATCH blocks FROM the project REpo
  // TO here
  // That way, we test the repo to ensure it throws the correct error
  // Then the controller decides how to react on errors
  // That's how I setup Lexicon.

  // See what happens if we remove the try.catch from the repo
  // What errors occur & can we catch them here
  getAllProjects() {
    const projects = this.projectRepository.getAllProjects();

    return projects;
  }

  addProject(project) {
    const response = this.projectRepository.addProject(project);

    // "status" is only when an error was thrown
    if ("status" in response) {
      if (response.status === "error") {
        return response; // returns error object we can check for in background.js
      }
    }

    this.searchController.addProjectToIndex(response);
    return response;
  }
}
