import { Menu, shell } from "electron";
import { showImportWarningDialog, showExportDialog } from "./dialogs";
// export the menu to be created by main (background.js) process.

export function generateMenu(mainWindow) {
  // Check if OS is darwin or not
  const template =
    process.platform === "darwin"
      ? buildDarwinTemplate(mainWindow)
      : buildDefaultTemplate(mainWindow);
  // Make menu
  const mainMenu = Menu.buildFromTemplate(template);
  return mainMenu;
}

export function generateContextMenu() {
  const contextMenu = Menu.buildFromTemplate([{ role: "editMenu" }]);
  return contextMenu;
}

function buildDarwinTemplate() {
  console.log("Darwin! You don't have a menu template yet! Oops!");
  return {};
}

function buildDefaultTemplate(mainWindow) {
  const defaultTemplate = [
    {
      label: "&File",
      submenu: [
        {
          label: "&Import Database",
          accelerator: "Ctrl+Shift+I",
          click: () => {
            showImportWarningDialog();
          }
        },
        {
          label: "&Export Database",
          accelerator: "Ctrl+Shift+E",
          click: () => {
            showExportDialog();
          }
        },
        {
          label: "&Close",
          accelerator: "Ctrl+W",
          click: () => {
            mainWindow.close();
          }
        }
      ]
    },
    { role: "editMenu" },
    {
      label: "&View",
      submenu:
        process.env.NODE_ENV === "development" ||
        process.env.DEBUG_PROD === "true"
          ? [
              {
                label: "&Reload",
                accelerator: "Ctrl+R",
                click: () => {
                  mainWindow.webContents.reload();
                }
              },
              {
                label: "Toggle &Full Screen",
                accelerator: "F11",
                click: () => {
                  mainWindow.setFullScreen(!mainWindow.isFullScreen());
                }
              },
              {
                label: "Toggle &Developer Tools",
                accelerator: "Alt+Ctrl+I",
                click: () => {
                  mainWindow.webContents.toggleDevTools();
                }
              }
            ]
          : [
              {
                label: "Toggle &Full Screen",
                accelerator: "F11",
                click: () => {
                  mainWindow.setFullScreen(!mainWindow.isFullScreen());
                }
              }
            ]
    },
    {
      label: "Help",
      submenu: [
        {
          label: "Learn More",
          click() {
            shell.openExternal("https://electronjs.org");
          }
        },
        {
          label: "Documentation",
          click() {
            shell.openExternal(
              "https://github.com/electron/electron/tree/master/docs#readme"
            );
          }
        }
      ]
    }
  ];

  return defaultTemplate;
}
