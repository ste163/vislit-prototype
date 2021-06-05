// Handle displaying  dialog.showErrorBox("Title", "Message: ${error}"
// for catch(error) blocks

// Make this a class so we can mock the functions

// const errorMessage = error => `Error Message: ${error}.`;

// export const displayGetByIdError = (typeString, error) =>
//

export default class ErrorHandler {
  constructor(dialog) {
    this.dialog = dialog;
  }

  // NOT NEEDED AS I'll be using the new Error("Unable to whatever")
  // AND PASSING THAT ERROR object into these

  // DO NOT NEED .isToastError
  // Because if we're passing the error to the frontend,
  // Then we know it's an error to display
  messageGenerator(error, isToastError) {
    // Will be using the new Error class, so this
    // will need to change
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
