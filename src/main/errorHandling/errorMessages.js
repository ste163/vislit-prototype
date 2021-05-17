function errorGenerator(error) {
  return {
    status: "error",
    message: `ERROR: ${error}`
  };
}

const errorMessages = {
  projectTitleDuplication() {
    return errorGenerator("Project title duplication in database.");
  },
  projectAddFailure() {
    return errorGenerator("Project failed to be added to database.");
  }
};

export default errorMessages;
