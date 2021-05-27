function errorGenerator(error, isToastError) {
  return {
    status: "error",
    message: `ERROR: ${error}`,
    isToastError: isToastError
  };
}

const errorMessages = {
  projectTitleDuplication() {
    return errorGenerator("Project title duplication in database.", true);
  }
};

export default errorMessages;
