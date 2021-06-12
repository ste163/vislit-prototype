/**
 * @jest-environment node
 */
import Database from "../database";
import ProjectRepository from "../repositories/projectRepository";
import SearchController from "./searchController";

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

test("constructor creates projectMiniSearch with items in index", () => {
  const searchController = new SearchController(projectRepository);

  expect(searchController._projectMiniSearch.documentCount).toEqual(2);
});

test("can add project to projectMiniSearch index", () => {
  const searchController = new SearchController(projectRepository);

  const originalCount = searchController._projectMiniSearch.documentCount;

  const project = {
    id: "3",
    title: "The Dead Zone",
    description: ""
  };

  searchController.addProject(project);

  const newCount = searchController._projectMiniSearch.documentCount;

  expect(newCount).toBeGreaterThan(originalCount);
});

test("can delete project from projectMiniSearch index", () => {
  const searchController = new SearchController(projectRepository);

  const originalCount = searchController._projectMiniSearch.documentCount;

  const projectToRemove = {
    id: "2",
    title: "The Shining",
    description: "An evil hotel possesses a groundskeeper."
  };

  searchController.removeProject(projectToRemove);

  const newCount = searchController._projectMiniSearch.documentCount;

  expect(newCount).toBeLessThan(originalCount);
});

test("can update project in projectMiniSearch index", () => {
  const searchController = new SearchController(projectRepository);

  const originalProject = searchController._projectMiniSearch._storedFields[1];

  const projectToUpdate = {
    id: "2",
    title: "The Shining",
    description: "An evil hotel attacks a family."
  };

  searchController.updateProject(originalProject, projectToUpdate);

  const updatedProject = searchController._projectMiniSearch._storedFields[2];

  expect(originalProject.description).not.toEqual(updatedProject.description);
  expect(updatedProject).toEqual({
    id: "2",
    title: "The Shining",
    description: "An evil hotel attacks a family."
  });
});

test("can search for projects by title", () => {
  const searchController = new SearchController(projectRepository);

  const firstSearch = searchController.searchProjects("It");
  const secondSearch = searchController.searchProjects("The Shining");

  expect(firstSearch[0].title).toEqual("It");
  expect(secondSearch[0].title).toEqual("The Shining");
});

test("can search for projects by description", () => {
  const searchController = new SearchController(projectRepository);

  const firstSearch = searchController.searchProjects("clown");
  const secondSearch = searchController.searchProjects("hotel");

  expect(firstSearch[0].title).toEqual("It");
  expect(secondSearch[0].title).toEqual("The Shining");
});
