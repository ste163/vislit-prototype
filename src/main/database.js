import { app, dialog } from "electron";
import { copyFile } from "fs";
import { nanoid } from "nanoid/non-secure";
import progressRepository from "./repositories/progressRepository";

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
// Load lowdb database from 'userData' dir or create if no db in dir
// On Linux, default location is: /userName/.config/projectTitle
// POSSIBILITY
// Maybe have the user be able to decide where the database file should load from. As in, on app load
// Initially check localStorage for a db location. So the user could place the db in cloud storage

// Use database globally
let db;

function getDbPath() {
  const userDataDirPath = app.getPath("userData");
  return `${userDataDirPath}/vislit-database.json`;
}

function generateId(item) {
  // Set id length with 21, should be enough to never have repeats
  item.id = nanoid(21);
  return item;
}

export function checkForValidDatabase(repositoryMethod) {
  if (db) {
    return repositoryMethod;
  }
  return null;
}

export function getAllProjects() {
  if (db) {
    return db.get("projects").value();
  }
  return null;
}

export function getProjectById(id) {
  if (db) {
    // WILL ALSO NEED TO GET ALL LINKED DATA
    return db
      .get("projects")
      .find({ id: id })
      .value();
  }
  return null;
}

export function addProject(project) {
  if (db) {
    // Need to check for if a project with that name is already in the database
    db.get("projects")
      .push(generateId(project))
      .write();
    return true;
  }
  return null;
}

// Must be async because Node's copyFile() is async? CHECK THIS
export async function exportDatabase(userInput) {
  const dbPath = getDbPath();
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

export function loadDb() {
  // If the file isn't there, it creates it.
  const adapter = new FileSync(getDbPath());
  // Connect lowdb to the db.json file
  db = low(adapter);
  // Set default json structure
  db.defaults({
    database: "vislit",
    shownWelcome: false,
    saveDataPath:
      "userOnFirst load will be asked to set this. Can change later",
    user: [],
    projects: [],
    types: [],
    progress: [],
    notes: [],
    collections: [],
    words: []
  }).write();

  // Assign database to all repository instances
  progressRepository.database = db;
}

// Must be async because Node's copyFile() is async
export async function importDatabase(userInput) {
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
    await copyFile(userInput, getDbPath(), () => {});
    // Reload database file from UserData
    loadDb();
    // Send a return value to check if import succeeded
    return "imported";
  } catch {
    newDb = null;
    adapter = null;
    dialog.showErrorBox(
      "Import Error",
      "Selected file may not be a valid Vislit database file, or an issue occurred during import."
    );
    return "failed";
  }
}
