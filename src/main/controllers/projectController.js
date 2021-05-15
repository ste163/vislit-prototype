import { dialog } from "electron";
import { addProjectToIndex } from "../search/searchInstantiator";

export default class ProjectController {
  constructor(database, projectRepository) {
    this.database = database;
    this.projectRepository = projectRepository;
  }

  addProject(project) {
    try {
      const response = this.projectRepository.addProject(project);
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
      // TODO:
      // MOVE THIS ERROR HANDER INTO A FUNCTION!
      // IN UTILS?
      if (error.includes("MAJOR ERROR")) {
        dialog.showErrorBox("Operation failed!", `${error}`);
      } else {
        return error;
      }
    }
  }
}
