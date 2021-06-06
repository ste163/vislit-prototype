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

  // NEED TO rewrite to have the title duplication check happen here
  addProject(project) {
    // 1. Check if title is in database with repo.getProjectByTitle
    // 2. If the title is there, throw the error
    // 3. If the title isn't there, add the project, because it'll work
    // const isProjectTitleTaken = this.getProjectByTitle(project.title);

    // if (isProjectTitleTaken !== undefined) {
    //   throw new Error("Project title already in database");
    // }

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
      const project = this.getProjectById(id);

      if (project === undefined) {
        throw new Error("Project not in database");
      }

      this.projectRepository.deleteProject(id);

      // THEN delete it from the search index

      return true;
    } catch (error) {
      console.error(error);
      return error; // or maybe return false? Probably false if we return true on sucess
      // Or return the error message so we can pass it to frontend...
    }
  }
}
