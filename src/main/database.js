import { app, dialog } from "electron";
import { copyFile } from "fs";
import { nanoid } from "nanoid/non-secure";
import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
// NOTE:
// Load lowdb database from 'userData' dir or create if no db in dir
// On Linux, default location is: /userName/.config/projectTitle
// TODO:
// User can decide database save location
// Initially check localStorage for a db location,
// So the user could place the db in cloud storage

export default class Database {
  constructor() {
    this.db = this._loadDatabase();
  }

  _loadDatabase() {
    const adapter = new FileSync(this.getDbPath()); // If file isn't there, create it
    const db = low(adapter); // Connect lowdb to db.json
    // Set default json structure
    db.defaults({
      database: "vislit",
      shownWelcome: false, // welcome message will ask where the user wants to save their data & welcome them
      saveDataPath:
        "userOnFirst load will be asked to set this. Can change later",
      user: [],
      projects: [],
      types: [],
      progress: [],
      notes: [],
      projectCollection: [],
      collections: [],
      words: []
    }).write();

    return db;
  }

  async importDatabase(userInput) {
    // Set lowdb specifics here so we can reset them to null when finished
    let adapter;
    let newDb;
    // Verify db file user selected is a legitimate vislit database by loading it into lowdb
    try {
      // Load user-selected .json file
      adapter = new FileSync(userInput);
      newDb = low(adapter);
      const databaseType = newDb.get("database").value();
      // Check if .json file has a database property & value of database: vislit
      if (databaseType !== "vislit") {
        newDb = null;
        adapter = null;
        throw { message: "Could not load db" };
      }

      // Typescript wants an blank anonymous callback
      // Overwite database in UserData with user-selected database
      await copyFile(userInput, this.getDbPath(), () => {});
      // Reload database file from UserData
      this._loadDatabase();
      // Send a return value to check if import succeeded
      return "imported";
    } catch {
      newDb = null;
      adapter = null;
      dialog.showErrorBox(
        "Import Error",
        "Selected file may not be a valid Vislit database file or an issue occurred during import."
      );
      return "failed";
    }
  }

  exportDatabase(userInput) {
    const dbPath = this.getDbPath();
    try {
      // Typescript wants an blank anonymous callback
      copyFile(dbPath, userInput, () => {});
    } catch {
      dialog.showErrorBox(
        "Export Error",
        "Unable to export database. Export operation failed."
      );
    }
  }

  getDbPath() {
    const userDataDirPath = app.getPath("userData");
    return `${userDataDirPath}/vislit-database.json`;
  }

  generateUniqueId(item) {
    item.id = nanoid(21);
    return item;
  }
}
