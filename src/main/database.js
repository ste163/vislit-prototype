import { copyFile, unlinkSync } from "fs";
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
  constructor(app, dialog) {
    this.app = app; // electron app instance (or spectron for testing)
    this.dialog = dialog;
    this.db = this._loadDatabase();
    this._isTestEnv = process.env.IS_TEST;
  }

  _getDatabasePath() {
    const userDataDirPath = this.app.getPath("userData");
    if (this._isTestEnv === true) {
      return `${userDataDirPath}/vislit-test-database.json`;
    } else {
      return `${userDataDirPath}/vislit-database.json`;
    }
  }

  _loadDatabase() {
    const adapter = new FileSync(this._getDatabasePath()); // If file isn't there, create it
    const db = low(adapter); // Connect lowdb to db.json
    // Set default json structure
    if (this._isTestEnv === true) {
      db.defaults({
        database: "vislit",
        user: [],
        projects: [
          { title: "It", description: "An evil clown attacks a town." },
          {
            title: "The Shining",
            description: "An evil hotel possesses a groundskeeper."
          }
        ],
        types: [],
        progress: [],
        notes: [],
        projectCollection: [],
        collections: [],
        words: []
      }).write();
    } else {
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
    }

    return db;
  }

  deleteDatabase() {
    const dbFile = this._getDatabasePath();
    unlinkSync(dbFile);
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

      // Typescript wants a blank anonymous callback
      // Overwite database in UserData with user-selected database
      await copyFile(userInput, this._getDatabasePath(), () => {});
      // Reload database file from UserData
      this._loadDatabase();
      // Send a return value to check if import succeeded
      return "imported";
    } catch {
      newDb = null;
      adapter = null;
      this.dialog.showErrorBox(
        "Import Error",
        "Selected file may not be a valid Vislit database file or an issue occurred during import."
      );
      return "failed";
    }
  }

  exportDatabase(userInput) {
    const dbPath = this._getDatabasePath();
    try {
      // Typescript wants a blank anonymous callback
      copyFile(dbPath, userInput, () => {});
    } catch {
      this.dialog.showErrorBox(
        "Export Error",
        "Unable to export database. Export operation failed."
      );
    }
  }

  generateUniqueId(item) {
    item.id = nanoid(21);
    return item;
  }
}
