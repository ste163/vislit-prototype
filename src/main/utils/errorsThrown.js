// Unassigned Repository
export const repoUnassigned = nameString =>
  `MAJOR ERROR: ${nameString} repository was never assigned!`;

// Unassigned Database
export const databaseUnassigned = nameString =>
  `MAJOR ERROR: ${nameString} database was never assigned`;

// Projects
export const projTitleDuplication = () =>
  `ERROR: Project title duplication in database.`;

export const projAddFail = () =>
  `ERROR: Project failed to be added to database.`;
