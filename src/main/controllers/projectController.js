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

  // Need to DECIDE:
  // Do we, on error, return the error or null
  // If we return the error we can display that string on the frontend

  getAllProjects() {
    return this.projectRepository.getAllProjects();
  }

  getProjectById(id) {
    try {
      return this.projectRepository.getProjectById(id);
    } catch (error) {
      console.error(error); // show this as a toast. Most should be toasts
      return null; // probably means we should return the error then, instead of null
    }
  }

  // Need to rewrite to catch the duplication error
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

  deleteProject(id) {
    try {
      return this.projectRepository.deleteProject(id);
    } catch (error) {
      console.error(error);
      return error; // or maybe return false? Probably false if we return true on sucess
      // Or return the error message so we can pass it to frontend...
    }
  }
}
