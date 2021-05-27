import { dialog } from "electron";
// Will most likely get rid of this entire file!
const errorMessage = error => `Error Message: ${error}.`;

export const displayGetAllError = (typeString, error) =>
  console.error(
    `ERROR: Unable to get all ${typeString}. ${errorMessage(error)}`
  );

export const displayGetByIdError = (typeString, error) =>
  dialog.showErrorBox("Error", `Unable to ${typeString} ${error}`);
