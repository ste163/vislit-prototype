/**
 * @jest-environment node
 */

// TODO:
// Implement in-memory database
// Implement real projectRepo
// Implement real searchController
// Implement real projectController

beforeEach(() => {
  // Disables the console.error messages jest displays
  // In the catch blocks
  jest.spyOn(console, "error").mockImplementation(() => {});
});

// test("can get all projects")

// test("can get project by id")

// test("trying to get project by id not in database returns error")

// test("can add project")

// test("trying to add project with name already in database throws error")

// test

// HOW TO MOCK A CLASS:
// import ErrorHandler from "../errorHandling/errorHandler";
// jest.mock("../errorHandling/errorHandler");

// beforeEach(() => {
//   // Clear all instances & calls to constructor & methods
//   ErrorHandler.mockClear();

//   const app = {
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
