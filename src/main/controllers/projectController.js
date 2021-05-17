export default class ProjectController {
  constructor(projectRepository, searchController) {
    this.projectRepository = projectRepository;
    this.searchController = searchController;
  }

  // Don't wrap in try/catch; .addProject always has a return
  addProject(project) {
    // Check if project is in db
    const response = this.projectRepository.addProject(project);
    //  If we have a 'status' we have an error
    if ("status" in response) {
      if (response.status === "error") {
        return response; // returns error object we can check for in background.js
      }
    }
    try {
      // may not need to wrap in try/catch depending on how testing goes
      // May be able to handle just like .addProject
      this.searchController.addProjectToIndex(response);
      return response; // Everything went well! Done!
    } catch (error) {
      // Display a "unable to add project to search index message"
      return null;
    }
  }
}
