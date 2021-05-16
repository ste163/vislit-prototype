import { app, BrowserWindow, dialog } from "electron";
import dateUtils from "../utils/dateUtils";

export default class Dialogs {
  constructor(database) {
    this.database = database;
  }

  _showImportDialog() {
    const result = dialog.showOpenDialogSync({
      buttonLabel: "Select database to import",
      defaultPath: app.getPath("home"),
      filters: [{ name: "JSON Database", extensions: ["json"] }],
      properties: ["openFile"]
    });

    if (result !== undefined) {
      this.database
        .importDatabase(result[0])
        .then(response => {
          // Send message to renderer that new db imported, so re-render
          if (response === "imported") {
            // Get webContents on first window (mainWindow)
            const wc = BrowserWindow.getAllWindows()[0].webContents;
            if (wc !== undefined) {
              // Send message
              wc.send("db-imported");
              // If we couldn't find this webContents, throw error
            } else if (wc === undefined) {
              throw { message: "WebContents is undefined" };
            }
          }
        })
        .catch(error =>
          dialog.showErrorBox(
            "Import Error",
            `Database imported, but unable to re-load webContents. Error message: ${error.message}.`
          )
        );
    }
  }

  showExportDialog() {
    const date = dateUtils.generateDateForFileExport();
    const homePath = app.getPath("home");

    const result = dialog.showSaveDialogSync({
      title: "Export Vislit Database",
      defaultPath: `${homePath}/${date}_vislit-database.json`,
      properties: ["createDirectory"]
    });

    if (result !== undefined) {
      this.database.exportDatabase(result);
    }
  }

  showImportWarningDialog() {
    const result = dialog.showMessageBoxSync({
      title: "Import Database",
      message: "Import warning",
      detail:
        "Importing a new database will overwrite the currently loaded database. To ensure no data loss, export your current database and back it up.",
      buttons: [
        "Select database to import",
        "Export current database",
        "Cancel"
      ]
    });

    switch (result) {
      case 0:
        this._showImportDialog();
        break;
      case 1:
        this.showExportDialog();
        break;
      default:
        break;
    }
  }
}
