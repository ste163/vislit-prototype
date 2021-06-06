// Test the projectController
// With a real in-memory database
// Real projectRepo

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
