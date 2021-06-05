/**
 * @jest-environment node
 */
import Database from "../database";
import ErrorHandler from "../errorHandling/errorHandler";
import ProjectRepository from "./projectRepository";
jest.mock("../errorHandling/errorHandler");
// Now that I'm going to be throwing errors
// It could be legit to have unit tests instead of only integration tests
// Because then the only integration tests would be through the controller!

// Why only integration tests?
// No value in mocking the entire lowdb database functions.
// The repository relies too much on lowdb to mock the Database class.

// Current Tests
// - getAllProjects - returns all projects
// - getAllProjects - error
// - getProjectById - returns project
// - getProjectById - error
// - deleteProject - success

// Tests todo:
// - addProject -  success, one new item in database
// - addProject - project title already in database
// - addProject - bad database returns the error message
// - deleteProject - returns error & ensure item is still in database
// - deleteProject - deletes all related data

let database = null;
let projectRepository = null;
let errorHandler = null;

beforeEach(() => {
  // Clear all instances & calls to constructor & methods
  ErrorHandler.mockClear();

  const app = {
    dialog: jest.fn(() => {})
  };

  errorHandler = new ErrorHandler();
  database = new Database(app, app.dialog);
  projectRepository = new ProjectRepository(database, errorHandler);

  database.db.data.projects = [
    { id: "1", title: "It", description: "An evil clown attacks a town." },
    {
      id: "2",
      title: "The Shining",
      description: "An evil hotel possesses a groundskeeper."
    }
  ];
});

test("can get all projects", () => {
  const projects = projectRepository.getAllProjects();

  expect(projects).toEqual([
    { id: "1", title: "It", description: "An evil clown attacks a town." },
    {
      id: "2",
      title: "The Shining",
      description: "An evil hotel possesses a groundskeeper."
    }
  ]);
});

// test("failing to get all projects displays error & returns null", () => {
//   // Need to mock the database.db.data.projects
//   // We will never have a null database.
//   const erroringProjectRepository = new ProjectRepository(null, errorHandler);

//   const projects = erroringProjectRepository.getAllProjects();

//   expect(projects).toBeNull();
// });

test("can get project by Id", () => {
  const project = projectRepository.getProjectById("2");

  expect(project).toEqual({
    id: "2",
    title: "The Shining",
    description: "An evil hotel possesses a groundskeeper."
  });
});

// test("failing to get project by Id displays error & returns null", () => {
//   const erroringProjectRepository = new ProjectRepository(null, errorHandler);

//   const project = erroringProjectRepository.getProjectById("2");

//   const mockErrorMessageInstance = ErrorHandler.mock.instances[0];

//   expect(mockErrorMessageInstance.displayGetByIdError).toHaveBeenCalled();
//   expect(project).toBeNull();
// });

// THIS NEEDS ANOTHER CHECK. IF IT'S NOT IN DATABASE, IT NEEDS TO THROW AN ERROR
// INSTEAD, IT SAYS "undefined".
test("can not get a project by id not in database", () => {
  function getProjectNotInDb() {
    return projectRepository.getProjectById("666");
  }

  const project = getProjectNotInDb();

  expect(project).toBeNull();
});

test("can delete a project", () => {
  const success = projectRepository.deleteProject("1");

  const projects = projectRepository.getAllProjects();

  expect(success).toEqual(true);
  expect(projects.length).toEqual(1);
});

// UNABLE TO FINISH TESTING. NEED TO ADD getById check in delete method
// test("can not delete a project not in database", () => {
//   // const error = projectRepository.deleteProject("666");

//   expect(projectRepository.deleteProject("666")).toThrow();
// });
