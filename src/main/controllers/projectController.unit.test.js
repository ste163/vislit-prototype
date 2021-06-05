/**
 * @jest-environment node
 */
import ProjectController from "./projectController";
// These unit tests mock the entire projectRepo
// They are only testing the logic for if an error occurs,
// Are we successfully returning the correct response from IPC

test("can get all projects", () => {
  // What happens when it all works, what happens when the repo fails?
  // That's an integration test
});

test("can add a project", () => {
  const projectRepository = {
    addProject: jest.fn(project => project)
  };
  const searchController = {
    addProjectToIndex: jest.fn(() => true)
  };

  const projectController = new ProjectController(
    projectRepository,
    searchController
  );

  const project = {
    title: "It",
    Description: "A murderous clown attacks a town"
  };

  expect(projectController.addProject(project)).toEqual({
    title: "It",
    Description: "A murderous clown attacks a town"
  });
});

test("adding a project with the same name throws an error", () => {
  const projectRepository = {
    addProject: jest.fn(() => {
      return {
        status: "error",
        message: "ERROR: Duplication!"
      };
    })
  };
  const searchController = {
    addProjectToIndex: jest.fn(() => true)
  };

  const projectController = new ProjectController(
    projectRepository,
    searchController
  );

  const project = {
    title: "It",
    Description: "A murderous clown attacks a town"
  };

  expect(projectController.addProject(project)).toEqual({
    status: "error",
    message: "ERROR: Duplication!"
  });
});

// OLD PROJECT REPO TESTS THAT USED THE ERRORHANDLER
// FOR EXAMPLE TO REWRITE THE CONTROLLER

// import ErrorHandler from "../errorHandling/errorHandler";
// jest.mock("../errorHandling/errorHandler");

// beforeEach(() => {
//   // Clear all instances & calls to constructor & methods
//   ErrorHandler.mockClear();

//   const app = {
//     getPath: jest.fn(() => ""), // if this works, change to an .ENV
//     dialog: jest.fn(() => {})
//   };

//   errorHandler = new ErrorHandler();
//   database = new Database(app, app.dialog);
//   projectRepository = new ProjectRepository(database, errorHandler);

//   database.db.data.projects = [
//     { id: "1", title: "It", description: "An evil clown attacks a town." },
//     {
//       id: "2",
//       title: "The Shining",
//       description: "An evil hotel possesses a groundskeeper."
//     }
//   ];
// });

// test("can get all projects", () => {
//   expect(ErrorHandler).toHaveBeenCalled();

//   const projects = projectRepository.getAllProjects();

//   // Ensure no error messages were called
//   const mockErrorMessageInstance = ErrorHandler.mock.instances[0];
//   expect(mockErrorMessageInstance.displayGetAllError).not.toHaveBeenCalled();

//   expect(projects).toEqual([
//     { id: "1", title: "It", description: "An evil clown attacks a town." },
//     {
//       id: "2",
//       title: "The Shining",
//       description: "An evil hotel possesses a groundskeeper."
//     }
//   ]);
// });

// test("failing to get all projects displays error & returns null", () => {
//   const erroringProjectRepository = new ProjectRepository(null, errorHandler);

//   const projects = erroringProjectRepository.getAllProjects();

//   const mockErrorMessageInstance = ErrorHandler.mock.instances[0];

//   expect(mockErrorMessageInstance.displayGetAllError).toHaveBeenCalled();
//   expect(projects).toBeNull();
// });

// test("can get project by Id", () => {
//   const project = projectRepository.getProjectById("2");

//   expect(project).toEqual({
//     id: "2",
//     title: "The Shining",
//     description: "An evil hotel possesses a groundskeeper."
//   });
// });

// test("failing to get project by Id displays error & returns null", () => {
//   const erroringProjectRepository = new ProjectRepository(null, errorHandler);

//   const project = erroringProjectRepository.getProjectById("2");

//   const mockErrorMessageInstance = ErrorHandler.mock.instances[0];

//   expect(mockErrorMessageInstance.displayGetByIdError).toHaveBeenCalled();
//   expect(project).toBeNull();
// });
