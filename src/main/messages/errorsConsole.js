const errorMessage = error => `Error Message: ${error}.`;

export const displayGetAllError = (typeString, error) =>
  console.error(
    `ERROR: Unable to get all ${typeString}. ${errorMessage(error)}`
  );

export const displayGetByIdError = (typeString, error) =>
  console.error(
    `ERROR: Unable to get ${typeString} by id. ${errorMessage(error)}.`
  );

export const displayAddError = (typeString, error) =>
  console.error(`ERROR: Unable to add ${typeString}. ${errorMessage(error)}`);

export const displayRemoveError = (typeString, error) =>
  console.error(
    `ERROR: Unable to remove ${typeString}. ${errorMessage(error)}`
  );
