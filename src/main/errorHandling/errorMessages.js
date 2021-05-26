function errorGenerator(error, isMajorError) {
  return {
    status: "error",
    message: `ERROR: ${error}`,
    isMajorError // use this to check in the errorHandler for if we should
    // do a toast on the frontend (pass the error object all the way to the frontend)
    // or show the error dialog
  };
}

const errorMessages = {
  projectTitleDuplication() {
    return errorGenerator("Project title duplication in database.", false);
  }
};

export default errorMessages;
