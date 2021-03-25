const dateUtils = {
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
