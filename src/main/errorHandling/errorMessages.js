// Handle displaying  dialog.showErrorBox("Title", "Message: ${error}"
// for catch(error) blocks

// Make this a class so we can mock the functions

// const errorMessage = error => `Error Message: ${error}.`;

// export const displayGetByIdError = (typeString, error) =>
//

export default class ErrorMessages {
  constructor(dialog) {
    this.dialog = dialog;
  }

  messageGenerator(error, isToastError) {
    return {
      status: "error",
      message: `ERROR: ${error}`,
      isToastError: isToastError
    };
  }

  projectTitleDuplication() {
    return this.messageGenerator(
      "Project title duplication in database.",
      true
    );
  }

  displayGetAllError(typeString, error) {
    this.dialog.showErrorBox(
      "Error",
      `Unable to get all: ${typeString} ${error}`
    );
  }

  displayGetByIdError(typeString, error) {
    this.dialog.showErrorBox(
      "Error",
      `Unable to get by id: ${typeString} ${error}`
    );
  }
}
