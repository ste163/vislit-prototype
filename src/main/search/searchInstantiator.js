import MiniSearch from "minisearch";
// Call Constructor in main process to create the needed MiniSearch instances for

// Once they're created, will need to go to the database, fetch all the items, and add them to the correct miniSearch index

export let projectMiniSearch = [];

// The constructor will also hold the logic for what we want to search by
// turn into a CLASS!! Maybe just call it the search Contrller
// and it takes in all the controllers we need
// but for testing, it's just the repos until it's fully switched over
export function searchInstantiator(projectRepository) {
  // Needs to get all Projects (add Notes, Collections, etc. as they're added)
  const projectsForIndex = projectRepository.getAllProjects();
  // new MiniSearch instance based on only searching certain project fields
  projectMiniSearch = new MiniSearch({
    fields: ["title", "description"],
    storeFields: ["id", "title", "description"],
    searchOptions: {
      boost: { title: 2 },
      fuzzy: 0.2
    }
  });

  // Index all the projects synchronously
  projectMiniSearch.addAll(projectsForIndex);
}

// Will need a remove project from index & an add project to index. I can then combine them into an "editProjectFromIndex"
// I can move all these "Project" related pieces into their own file
export function searchProjects(query) {
  // searchProjects using the default settings created during instantiation
  return projectMiniSearch.search(query);
}

export function addProjectToIndex(project) {
  projectMiniSearch.add(project);
}
