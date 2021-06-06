// Test the projectController
// With a real in-memory database
// Real projectRepo

// TODO:
// Implement in-memory database
// Implement real projectRepo
// NEED TO TEST BEFORE I CAN DO: searchController
// Implement real projectController

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
