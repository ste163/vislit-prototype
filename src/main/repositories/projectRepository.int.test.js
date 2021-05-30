import projectRepository from "./projectRepository";

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
// 2. Delete TEST database when all tests complete
// Will need to create a mock projectRepo

test("can get projects", () => {});
