import lodash from "lodash";
import { copyFile, unlinkSync } from "fs";
import { LowSync, JSONFileSync } from "lowdb";
import { nanoid } from "nanoid/non-secure";
// NOTE:
// Load lowdb database from 'userData' dir or create if no db in dir
// On Linux, default location is: /userName/.config/projectTitle
// TODO:
// User can decide database save location
// Initially check localStorage for a db location,
// So the user could place the db in cloud storage

export default class Database {
  constructor(app, dialog) {
    this._isTestEnv = process.env.NODE_ENV;
    this.app = app; // electron app instance (or spectron for testing)
    this.dialog = dialog;
    this.db = this._loadDatabase();
  }

  _getDatabasePath() {
    const userDataDirPath = this.app.getPath("userData");
    if (this._isTestEnv === "test") {
      // Create test database in projects root
      return `${process.env.PWD}/vislit-test-database.json`;
    } else {
      return `${userDataDirPath}/vislit-database.json`;
    }
  }

  _loadDatabase() {
    // TODO: Use the (new MemorySync()) in lowdb for having the db only live in memory
    // https://github.com/typicode/lowdb/tree/main/examples
    const adapter = new JSONFileSync(this._getDatabasePath()); // If file isn't there, create it
    const db = new LowSync(adapter); // Connect lowdb to vislit-database.json

    db.read();

    if (db.data === null) {
      // Set default database structure
      if (this._isTestEnv === "test") {
        db.data = {
          database: "vislit",
          user: [],
          projects: [],
          types: [],
          progress: [],
          notes: [],
          projectCollection: [],
          collections: [],
          words: []
        };
        db.write();
      } else {
        db.data = {
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
        };
        db.write();
      }
    }

    // Add lodash to database after it has been setup
    db.chain = lodash.chain(db.data);

    return db;
  }

  deleteDatabase() {
    const dbFile = this._getDatabasePath();
    unlinkSync(dbFile); // deletes file
  }

  importDatabase(userInput) {
    // Set lowdb specifics here so we can reset them to null when finished
    let adapter;
    let newDb;
    // Verify db file user selected is a legitimate vislit database by loading it into lowdb
    try {
      // Load user-selected .json file
      adapter = new JSONFileSync(userInput);
      newDb = new LowSync(adapter);
      const databaseType = newDb.get("database").value();
      // Check if .json file has a database property & value of database: vislit
      if (databaseType !== "vislit") {
        newDb = null;
        adapter = null;
        throw { message: "Could not load db" };
      }

      // Typescript wants a blank anonymous callback
      // Overwite database in UserData with user-selected database
      copyFile(userInput, this._getDatabasePath(), () => {});
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
