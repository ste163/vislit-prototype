import { dialog } from "electron";

// ERROR MESSAGSE:
// All major errors should be invoked here
// because this is the controller for the repos
// If repose have an error, they throw a message
// and I can react from this file
export default class ProjectController {
  constructor(projectRepository, searchController) {
    this.projectRepository = projectRepository;
    this.searchController = searchController;
  }

  addProject(project) {
    try {
      // See if we have this project in the database
      const response = this.projectRepository.addProject(project);
      // If it's a string, we have an error message.
      if (typeof response === "string") {
        // Return response with an error.message that can be displayed on the frontend
        // That way, the strings will all live somewhere in the backend instead of
        // Both front & back
        return response;
      }

      // If response has a "title" property, it was added properly
      if ("title" in response) {
        try {
          // Add to search index
          this.searchController.addProjectToIndex(response);
          return response;
        } catch (error) {
          // Display a REALLY serious error message!
          return null;
        }
      } else {
        // throw an error that the response didn't have a title
        // so we couldn't add it to the index?
      }
    } catch (error) {
      if (error.includes("MAJOR ERROR")) {
        dialog.showErrorBox("Operation failed!", `${error}`);
      } else {
        return error;
      }
    }
  }
}
