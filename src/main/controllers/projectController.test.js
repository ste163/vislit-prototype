import ProjectController from "./projectController";

test("can add a project", () => {
  const projectRepository = {
    addProject: jest.fn(project => project)
  };
  const searchController = {
    addProjectToIndex: jest.fn(() => true)
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

test("adding a project with the same name throws an error", () => {
  const projectRepository = {
    addProject: jest.fn(() => {
      return {
        status: "error",
        message: "ERROR: Duplication!"
      };
    })
  };
  const searchController = {
    addProjectToIndex: jest.fn(() => true)
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
    status: "error",
    message: "ERROR: Duplication!"
  });
});
