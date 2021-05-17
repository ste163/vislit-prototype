import MiniSearch from "minisearch";

export default class SearchController {
  constructor(projectRepository) {
    this.projectRepository = projectRepository;
    this.projectMiniSearch = this.createProjectMiniSearch(
      this.projectRepository
    );
  }

  createProjectMiniSearch(projectRepository) {
    const projectsForIndex = projectRepository.getAllProjects();
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

  addProjectToIndex(project) {
    this.projectMiniSearch.add(project);
  }

  searchProjects(query) {
    return this.projectMiniSearch.search(query);
  }

  // REMOVE PROJECT FROM INDEX

  // EDIT PROJECT IN INDEX THAT COMBINES ADD & REMOVE??
}
