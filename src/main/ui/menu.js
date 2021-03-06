import { Menu, MenuItem } from "electron";
// export the menu to be created by main(background) process.

// Will need a check to see if user is on darwin to give either the defaultTemplate or darwinTemplate
// See React-boiler plate: https://github.com/ste163/prototype_vislit/blob/main/src/main/menu.ts

export function generateMenu() {
  // Check if we're darwin or not to decide what to make

  const mainMenu = new Menu();

  const menuItem1 = new MenuItem({ label: "Electron" });

  mainMenu.append(menuItem1);

  return mainMenu;
}
