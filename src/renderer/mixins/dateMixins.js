// Need to decide how to store dates, then convert them for rendering
// Date string conversion
// https://javascript.plainenglish.io/it-is-really-easy-to-convert-local-time-to-utc-in-javascript-7e6a78460a7d
export const dateMixin = {
  methods: {
    // requires new Date() date object
    formatDateString(date) {
      if (typeof date === "string") {
        date = this.convertToDateObject(date);
      }
      // Create format objects for Intl
      const formatOptions = { day: "numeric", year: "numeric", month: "long" };
      // Format the date using Intl
      return new Intl.DateTimeFormat("en-US", formatOptions).format(date);
    },
    convertToDateObject(string) {
      return new Date(string);
    }
  }
};
