const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

let mainWindow;

// Function to create the main window
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, // Can be set to true after debugging
    },
  });

  // Load the HTML file for the welcome page
  mainWindow.loadFile("index.html");

  // Open the DevTools (optional, for debugging)
  // mainWindow.webContents.openDevTools();
}

// When Electron is ready, create the window
app.whenReady().then(() => {
  createWindow();

  // macOS: Recreate the window if the dock icon is clicked and there are no other windows open
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit the app when all windows are closed (for Windows/Linux)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// Listen for navigation events from the renderer process
ipcMain.on("navigate-to-map", () => {
  console.log("Received 'navigate-to-map' message from renderer");
  if (mainWindow) {
    mainWindow.loadFile("map.html");
  }
});

ipcMain.on("navigate-to-index", () => {
  console.log("Received 'navigate-to-index' message from renderer");
  if (mainWindow) {
    mainWindow.loadFile("index.html");
  }
});
