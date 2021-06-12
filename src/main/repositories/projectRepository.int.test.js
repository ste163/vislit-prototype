/**
 * @jest-environment node
 */
import Database from "../database";
import ProjectRepository from "./projectRepository";
// Why only projectRepo integration tests?
// Not enough value with mocking entire database class
// The only unit tests would be if errors were thrown, which I'm testing here

let projectRepository = null;

beforeEach(() => {
  const app = {
    dialog: jest.fn(() => {})
  };
  const database = new Database(app, app.dialog);
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
  const projects = projectRepository.getAll();

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
  const project = projectRepository.getByTitle("The Shining");

  expect(project).toEqual({
    id: "2",
    title: "The Shining",
    description: "An evil hotel possesses a groundskeeper."
  });
});

test("trying to get project by title not in database returns undefined", () => {
  const project = projectRepository.getByTitle("The Dead Zone");

  expect(project).toBeUndefined();
});

test("can get project by id", () => {
  const project = projectRepository.getById("2");

  expect(project).toEqual({
    id: "2",
    title: "The Shining",
    description: "An evil hotel possesses a groundskeeper."
  });
});

test("trying to get project by id not in database throws error", () => {
  const project = projectRepository.getById("666");

  expect(project).toBeUndefined();
});

test("can add project to database", () => {
  const newProject = {
    title: "The Dead Zone",
    description: "An evil man becomes president and could cause a nuclear war."
  };

  projectRepository.add(newProject);

  const projects = projectRepository.getAll();

  expect(projects.length).toEqual(3);
});

test("can update project", () => {
  const updatedProject = {
    id: "1",
    title: "It - by S.K.",
    description: "It's really scary"
  };

  const response = projectRepository.update(updatedProject);

  expect(response).toEqual({
    id: "1",
    title: "It - by S.K.",
    description: "It's really scary"
  });
});

test("can delete project", () => {
  projectRepository.delete("1");

  const projects = projectRepository.getAll();

  expect(projects.length).toEqual(1);
});
