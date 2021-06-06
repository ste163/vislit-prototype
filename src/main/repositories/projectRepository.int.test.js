/**
 * @jest-environment node
 */
import Database from "../database";
import ProjectRepository from "./projectRepository";
// Why only projectRepo integration tests?
// Not enough value with mocking entire database class
// The only unit tests would be if errors were thrown, which I'm testing here

let database = null;
let projectRepository = null;

beforeEach(() => {
  const app = {
    dialog: jest.fn(() => {})
  };
  database = new Database(app, app.dialog);
  projectRepository = new ProjectRepository(database);

  // Add mock data to database
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

test("can get a project by title", () => {
  const project = projectRepository.getProjectByTitle("The Shining");

  expect(project).toEqual({
    id: "2",
    title: "The Shining",
    description: "An evil hotel possesses a groundskeeper."
  });
});

test("trying to get project by title not in database throws error", () => {
  function getProjectNotInDb() {
    projectRepository.getProjectByTitle("The Dead Zone");
  }

  expect(getProjectNotInDb).toThrowError(
    new Error("Project with that title not in database")
  );
});

test("can get project by id", () => {
  const project = projectRepository.getProjectById("2");

  expect(project).toEqual({
    id: "2",
    title: "The Shining",
    description: "An evil hotel possesses a groundskeeper."
  });
});

test("trying to get project by id not in database throws error", () => {
  function getProjectNotInDb() {
    return projectRepository.getProjectById("666");
  }

  expect(getProjectNotInDb).toThrowError(
    new Error("Project with that id not in database")
  );
});

test("can add project to database", () => {
  const newProject = {
    title: "The Dead Zone",
    description: "An evil man becomes president and could cause a nuclear war."
  };

  projectRepository.addProject(newProject);

  const projects = projectRepository.getAllProjects();

  expect(projects.length).toEqual(3);
});

test("can delete project", () => {
  projectRepository.deleteProject("1");

  const projects = projectRepository.getAllProjects();

  expect(projects.length).toEqual(1);
});
