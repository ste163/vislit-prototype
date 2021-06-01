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

// Tests todo:
// - DONE- getAllProjects - returns all projects
// - DONE - getAllProjects - error
// - DONE - getProjectById - returns project
// - getProjectById - error
// - addProject -  success
// - addProject - project title already in database
// - deleteProject - success
// - deleteProject - error

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
