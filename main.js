const {app, BrowserWindow, ipcMain, protocol} = require('electron')
const path = require('path')
const url = require('url')
const fs = require('fs')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let authWindow;

protocol.registerStandardSchemes(['outflux'])

function createMainWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: 'hiddenInset',
    frame: true,
    minWidth: 400,
    minHeight: 600,
    transparent: false
  });

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'mainAppWindow.html'),
    protocol: 'file:',
    slashes: true
  }));
  mainWindow.maximize()
  // Open the DevTools.
  // win.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  });
}

// authentication window
function createAuthWindow () {
  // Create the browser window.
  authWindow = new BrowserWindow({
    width: 400,
    height: 600,
    titleBarStyle: 'hiddenInset',
    frame: true,
    minWidth: 400,
    minHeight: 600,
    maxWidth: 400,
    maxHeight: 600,
    transparent: false,
    webPreferences: {
      nodeIntegration: false
    }
  });

  protocol.registerBufferProtocol('outflux', (request, callback) => {
    callback({mimeType: 'text/html', data: fs.readFileSync(path.join(__dirname, 'authWindow.html'))})
  }, (error) => {
    if (error) console.error('Failed to register protocol')
  })

  authWindow.loadURL(`outflux://authWindow.html`)

  // and load the index.html of the app.
  // authWindow.loadURL(url.format({
  //   pathname: path.join(__dirname, 'authWindow.html'),
  //   protocol: 'file:',
  //   slashes: true
  // }));
  // Open the DevTools.
  // win.webContents.openDevTools()

  // Emitted when the window is closed.
  authWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    authWindow = null
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function() {
  // createMainWindow();
  createAuthWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  // if (process.platform !== 'darwin') {
   app.quit();
  // }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
//

// app.addEventListener('mousewheel', function(e) {
//   if (e.ctrlKey) {
//     e.preventDefault();
//   }
// });
