import { checkForValidDatabase } from "../database";
import { addProjectToIndex } from "../search/searchInstantiator";

const projectController = {
  // On initial load, we assign the repo
  projectRepository: null,

  _checkForProjectRepo() {
    if (this.projectRepository === null) {
      throw "project repo never assigned! VERY BAD ERROR";
    }
  },

  addProject(project) {
    try {
      this._checkForProjectRepo();

      // MAKE CHECK FOR VALID DB A HELPER IN THE REPO!!!
      const response = checkForValidDatabase(
        this.projectRepository.addProject(project)
      );

      // If it's a string, we have an error message.
      if (typeof response === "string") {
        // Return response so frontend can properly handle what notification to display.
        // Honestly, make the error messages dope enough that I can just display those suckers :P
        return response;
      }

      // If the response has a "title" property, it added properly
      if ("title" in response) {
        try {
          addProjectToIndex(response);
          return response;
        } catch (error) {
          // Display a REALLY serious error message!
          // Possibly return something other than null?
          return null;
        }
      }
    } catch (error) {
      // Do some cool error handling
      return error;
    }
  }
};

export default projectController;
