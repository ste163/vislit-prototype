/**
 * @jest-environment node
 */
import Database from "../database";
import ProjectRepository from "../repositories/projectRepository";
import ProjectController from "./projectController";
import SearchController from "./searchController";

let database = null;
let projectRepository = null;
let searchController = null;
let projectController = null;

beforeEach(() => {
  // Disables the console.error messages jest displays
  // In the catch blocks
  jest.spyOn(console, "error").mockImplementation(() => {});

  const app = {
    dialog: jest.fn(() => {})
  };

  database = new Database(app, app.dialog);

  // Add mock data to database
  database.db.data.projects = [
    { id: "1", title: "It", description: "An evil clown attacks a town." },
    {
      id: "2",
      title: "The Shining",
      description: "An evil hotel possesses a groundskeeper."
    }
  ];

  projectRepository = new ProjectRepository(database);

  searchController = new SearchController(projectRepository);
});

test("can get all projects", () => {
  projectController = new ProjectController(
    projectRepository,
    searchController
  );

  const projects = projectController.getAll();

  expect(projects).toEqual([
    { id: "1", title: "It", description: "An evil clown attacks a town." },
    {
      id: "2",
      title: "The Shining",
      description: "An evil hotel possesses a groundskeeper."
    }
  ]);
});

test("trying to get all projects with bad database returns error", () => {
  const badRepo = new ProjectRepository(null);

  projectController = new ProjectController(badRepo, searchController);

  const projects = projectController.getAll();

  expect(projects).toBeInstanceOf(Error);
});

// test("can get project by id")

// test("trying to get project by id not in database returns error")

// test("can add project")

// test("trying to add project with name already in database returns error")

// test("can delete project")

// test("trying to delete project by id not in database returns error")

//

//

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
