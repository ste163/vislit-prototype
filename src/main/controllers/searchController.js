import MiniSearch from "minisearch";

export default class SearchController {
  constructor(projectRepository) {
    this.projectRepository = projectRepository;
    this.projectMiniSearch = createProjectMiniSearch(this.projectRepository);
  }

  searchProjects(query) {
    return this.projectMiniSearch.search(query);
  }

  addProjectToIndex(project) {
    this.projectMiniSearch.add(project);
  }

  // REMOVE PROJECT FROM INDEX

  // EDIT PROJECT IN INDEX THAT COMBINES ADD & REMOVE??
}

function createProjectMiniSearch(projectRepository) {
  const projectsForIndex = projectRepository.getAllProjects();
  // new MiniSearch instance based on only searching certain project fields
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
