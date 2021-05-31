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
// 1. Create the actual TEST version of the database when tests start
// using a mock app function to get the hard-coded path
// 2. Once tests finish, delete the database at the hard-coded path
let database = null;
let projectRepository = null;

beforeAll(() => {
  console.log(process.env.IS_TEST);
  const app = {
    getPath: jest.fn(() => "/home/lin/Desktop/"), // if this works, change to an .ENV
    dialog: jest.fn(() => {})
  };
  database = new Database(app, app.dialog);
  projectRepository = new ProjectRepository(database);
});

test("can get projects", async () => {
  const projects = projectRepository.getAllProjects();

  console.log("PROEJCTS", projects);

  expect(projects).toEqual(
    { title: "It", description: "An evil clown attacks a town." },
    {
      title: "The Shining",
      description: "An evil hotel possesses a groundskeeper."
    }
  );

  console.log("FINISHED ALL TESTS");
});
