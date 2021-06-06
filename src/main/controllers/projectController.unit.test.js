/**
 * @jest-environment node
 */
import ProjectController from "./projectController";
// No unit tests for getAllProjects
// not enough controller logic exists to check

beforeEach(() => {
  // Disables the console.error messages jest displays
  // In the catch blocks
  jest.spyOn(console, "error").mockImplementation(() => {});
});

test("can add project", () => {
  const projectRepository = {
    getProjectByTitle: jest.fn(() => undefined),
    addProject: jest.fn(project => project)
  };

  const searchController = {
    addProject: jest.fn(() => true)
  };

  const projectController = new ProjectController(
    projectRepository,
    searchController
  );

  const project = {
    title: "It",
    Description: "A murderous clown attacks a town"
  };

  expect(projectController.addProject(project)).toEqual({
    title: "It",
    Description: "A murderous clown attacks a town"
  });
});

test("trying to add project with same name returns error", () => {
  const projectRepository = {
    getProjectByTitle: jest.fn(project => project) // causes error to be thrown
  };

  const searchController = {
    addProject: jest.fn(() => true)
  };

  const projectController = new ProjectController(
    projectRepository,
    searchController
  );

  const project = {
    title: "It",
    Description: "A murderous clown attacks a town"
  };

  expect(projectController.addProject(project)).toEqual(
    new Error("Project title already in database")
  );
});

// TODO:
// Add searchController to delete project
test("can delete project", () => {
  const projectRepository = {
    getProjectById: jest.fn(id => id),
    deleteProject: jest.fn(() => {})
  };

  const searchController = {};

  const projectController = new ProjectController(
    projectRepository,
    searchController
  );

  const success = projectController.deleteProject(1);

  expect(success).toEqual(true);
});

test("trying to delete project with id not in database returns error", () => {
  const projectRepository = {
    getProjectById: jest.fn(() => undefined),
    deleteProject: jest.fn(() => {})
  };

  const searchController = {};

  const projectController = new ProjectController(
    projectRepository,
    searchController
  );

  projectController.deleteProject(666);

  expect(projectController.deleteProject(666)).toEqual(
    new Error("Project not in database")
  );
});
