// Handle displaying  dialog.showErrorBox("Title", "Message: ${error}"
// for catch(error) blocks

export default class ErrorHandler {
  constructor(dialog) {
    this.dialog = dialog;
  }

  // VERY GOOD CHANCE I WILL NOT NEED THIS CLASS ANYMORE
  // AS THE new Error() has a lot of it's own stuff built in
  // May be able to just pass the "dialog" into the controller classes

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
