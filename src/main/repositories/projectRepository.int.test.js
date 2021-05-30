/**
 * @jest-environment node
 */
const spectron = require("spectron");
const { testWithSpectron } = require("vue-cli-plugin-electron-builder");
jest.setTimeout(50000);
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
// 1. NEED SPECTRON to do the integration test w/ node
// 2. Create the actual TEST version of the database when tests start
// 3. Delete TEST database when all tests complete
// Will need to create a mock projectRepo

test("can get projects", async () => {
  const { app, stopServe } = await testWithSpectron(spectron);
  const database = new Database(app, app.dialog);
  const projectRepository = new ProjectRepository(database);

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
  await stopServe();
});
