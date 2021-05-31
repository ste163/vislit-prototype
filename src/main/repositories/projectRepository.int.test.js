/**
 * @jest-environment node
 */

import ProjectRepository from "./projectRepository";
import Database from "../database";
// Why only integration tests?
// No value in mocking the entire lowdb database functions.
// The repository relies too much on lowdb to mock the Database class.

// Tests todo:
// - getAllProjects - returns all projects
// - getAllProjects - error
// - getProjectById - returns project
// - getProjectById - error
// - addProject -  success
// - addProject - project title already in database
// - deleteProject - success
// - deleteProject - error

// TODO:
// Use the in-memory version of lowdb instead of actually making the database
// Once tests finish, delete the database at the hard-coded path
let database = null;
let projectRepository = null;

beforeAll(() => {
  const app = {
    getPath: jest.fn(() => ""), // if this works, change to an .ENV
    dialog: jest.fn(() => {})
  };
  database = new Database(app, app.dialog);
  projectRepository = new ProjectRepository(database);
});

afterAll(() => {
  database.deleteDatabase();
});

beforeEach(() => {
  // Add all the projects to the database
});

afterEach(() => {
  // Remove everything from the database
  // Should be as simple as resetting everything to an empty string
  // with the new version of lowdb
});

test("can get projects", async () => {
  const projects = projectRepository.getAllProjects();

  expect(projects).toEqual(
    { title: "It", description: "An evil clown attacks a town." },
    {
      title: "The Shining",
      description: "An evil hotel possesses a groundskeeper."
    }
  );

  console.log("FINISHED ALL TESTS");
});
