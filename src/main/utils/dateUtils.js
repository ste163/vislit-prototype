const dateUtils = {
  // Create a date method for adding today's date for an item
  // Will probably be best to store JUST the new Date() object as a string, which happens automatically, it seems
  // Will need to test it with and without JSON.stringify()
  // By using the date object, I will probably have the most freedom later.

  generateDateForFileExport() {
    const today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();

    if (dd < 10) {
      dd = `0${dd}`;
    }

    if (mm < 10) {
      mm = `0${mm}`;
    }

    const converted = `${yyyy}-${mm}-${dd}`;

    return converted;
  }
};

export default dateUtils;
