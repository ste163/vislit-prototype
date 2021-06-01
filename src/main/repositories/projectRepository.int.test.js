/**
 * @jest-environment node
 */
import Database from "../database";
import ErrorMessages from "../errorHandling/errorMessages";
import ProjectRepository from "./projectRepository";
jest.mock("../errorHandling/errorMessages");
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
let errorMessages = null;

beforeEach(() => {
  // Clear all instances & calls to constructor & methods
  ErrorMessages.mockClear();

  const app = {
    getPath: jest.fn(() => ""), // if this works, change to an .ENV
    dialog: jest.fn(() => {})
  };

  errorMessages = new ErrorMessages();
  database = new Database(app, app.dialog);
  projectRepository = new ProjectRepository(database, errorMessages);

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
  expect(ErrorMessages).toHaveBeenCalled();

  const projects = projectRepository.getAllProjects();

  // Ensure no error messages were called
  const mockErrorMessageInstance = ErrorMessages.mock.instances[0];
  expect(mockErrorMessageInstance.displayGetAllError).not.toHaveBeenCalled();

  expect(projects).toEqual([
    { id: "1", title: "It", description: "An evil clown attacks a town." },
    {
      id: "2",
      title: "The Shining",
      description: "An evil hotel possesses a groundskeeper."
    }
  ]);
});

test("failing to get all projects displays error & returns null", () => {
  const erroringProjectRepository = new ProjectRepository(null, errorMessages);

  const projects = erroringProjectRepository.getAllProjects();

  const mockErrorMessageInstance = ErrorMessages.mock.instances[0];

  expect(mockErrorMessageInstance.displayGetAllError).toHaveBeenCalled();
  expect(projects).toBeNull();
});

test("can get project by Id", () => {
  const project = projectRepository.getProjectById("2");

  expect(project).toEqual({
    id: "2",
    title: "The Shining",
    description: "An evil hotel possesses a groundskeeper."
  });
});

test("failing to get project by Id displays error & returns null", () => {
  const erroringProjectRepository = new ProjectRepository(null, errorMessages);

  const project = erroringProjectRepository.getProjectById("2");

  const mockErrorMessageInstance = ErrorMessages.mock.instances[0];

  expect(mockErrorMessageInstance.displayGetByIdError).toHaveBeenCalled();
  expect(project).toBeNull();
});

// THIS NEEDS ANOTHER CHECK. IF IT'S NOT IN DATABASE, IT NEEDS TO THROW AN ERROR
// INSTEAD, IT SAYS "undefined".
test("can not get a project by id not in database", () => {
  // const project = projectRepository.getProjectById("666");
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
