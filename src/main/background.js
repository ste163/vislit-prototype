"use strict";

// Entry point for main process
import { app, protocol, BrowserWindow, ipcMain, Menu, dialog } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
import { generateContextMenu, generateMenu } from "./ui/menus";
import Database from "./database";
import Dialogs from "./ui/dialogs";
import progressRepository from "./repositories/progressRepository";
import ProjectRepository from "./repositories/projectRepository";
import ProjectController from "./controllers/projectController";
import SearchController from "./controllers/searchController";
const isDevelopment = process.env.NODE_ENV !== "production";

// Have to assign them globally to be used by IPC
let dialogs = null;
let projectController = null;
let searchController = null;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } }
]);

// FOR NOW: instantiate all classes here
// Will probably need to move it to the app.on() later
try {
  const database = new Database(app, dialog);
  dialogs = new Dialogs(database);

  // Instantiate Repositories
  const projectRepository = new ProjectRepository(database);

  // Instantiate Controllers
  searchController = new SearchController(projectRepository); // must come first
  projectController = new ProjectController(
    projectRepository,
    searchController
  );
} catch (e) {
  console.log("");
  console.log("*************************************************");
  console.log("UNABLE TO COMPLETE DATABASE/REPO/CONTROLLER SETUP:", e);
  console.log("*************************************************");
  console.log("");
}

async function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    minWidth: 500,
    minHeight: 400,
    width: 1024,
    height: 768,
    backgroundColor: "#f6f6f6",
    // icon: get location to icon
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
    }
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) mainWindow.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    mainWindow.loadURL("app://./index.html");
  }

  // Add event listener for context menu
  mainWindow.webContents.on("context-menu", () => {
    generateContextMenu().popup();
  });

  // Create app menu based on OS
  Menu.setApplicationMenu(generateMenu(mainWindow, dialogs));
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }
  createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", data => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}

// *** EVENT LISTENERS AKA ENDPOINTS *** //

// *** DATABASE *** //
// Projects
ipcMain.handle("db-projects-get-all", () => {
  return projectController.getAll();
});

ipcMain.handle("db-projects-get-selected", (e, id) => {
  return projectController.getById(id);
});

ipcMain.handle("db-projects-add", (e, project) => {
  return projectController.add(project);
});

ipcMain.handle("db-projects-update", (e, project) => {
  console.log(project);
  return null;
});

ipcMain.handle("db-projects-delete", (e, projectId) => {
  return projectController.delete(projectId);
});

// Progress
ipcMain.handle("db-progress-get-by-project-id", (e, projectId) => {
  console.log("GET PROGRESS FOR PROJECT ID", projectId);
});

ipcMain.handle("db-progress-add", (e, progress) => {
  return progressRepository.addProgressToProject(progress);
});

// *** SEARCH *** //
// Global
ipcMain.handle("search-globally", (e, query) => {
  return searchController.searchProjects(query);
});
