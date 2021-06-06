import MiniSearch from "minisearch";
// Need to write integration tests for the searchController
// To ensure the logic works for projects

export default class SearchController {
  constructor(projectRepository) {
    this.projectRepository = projectRepository;
    this._projectMiniSearch = this.createProjectMiniSearch(
      this.projectRepository
    );
  }

  createProjectMiniSearch(projectRepository) {
    const projectsForIndex = projectRepository.getAll();
    // Set search options
    const projectMiniSearch = new MiniSearch({
      fields: ["title", "description"],
      storeFields: ["id", "title", "description"],
      searchOptions: {
        boost: { title: 2 },
        fuzzy: 0.2
      }
    });
    // Index all the projects synchronously
    projectMiniSearch.addAll(projectsForIndex);
    return projectMiniSearch;
  }

  addProject(project) {
    this._projectMiniSearch.add(project);
  }

  searchProjects(query) {
    return this._projectMiniSearch.search(query);
  }

  // REMOVE PROJECT FROM INDEX

  // EDIT PROJECT IN INDEX THAT COMBINES ADD & REMOVE??
}
