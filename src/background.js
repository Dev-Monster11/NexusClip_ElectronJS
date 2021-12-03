"use strict";

import {
  app,
  BrowserWindow,
  Menu,
  protocol,
  Tray,
  ipcMain,
  nativeImage
} from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
import { getVideosFolder } from "platform-folders";

const fs = require("fs");
const path = require("path");
const url = require("url");
const gotTheLock = app.requestSingleInstanceLock();
const { autoUpdater } = require("electron-updater");
const isDevelopment = process.env.NODE_ENV !== "production";
const log = require("electron-log");
const Mixpanel = require("mixpanel");
const mixpanel = Mixpanel.init("123456");
let tray = null;
let win = null;
const { Notification } = require("electron");
var AutoLaunch = require("auto-launch");

// Xbox gamebar params
var regedit = require("regedit");
regedit.setExternalVBSLocation("resources/regedit/vbs");

ipcMain.on("mixpanel_CreateAccount", (event, arg) => {
  mixpanel.track("Click", {
    Element: arg,
    Page: "Login",
    Device: "Desktop",
    Version: app.getVersion(),
  });
});

ipcMain.on("mixpanel_LoginAccount", (event, arg) => {
  mixpanel.track("Click", {
    Element: arg,
    Page: "Login",
    Device: "Desktop",
    Version: app.getVersion(),
  });
});

ipcMain.on("mixpanel_Gated", (event, arg) => {
  global.user_id = arg;
  mixpanel.track("Session", {
    distinct_id: arg,
    Type: "Client",
    User: arg,
    Device: "Desktop",
    Version: app.getVersion(),
  });
});

// Menú app
const menu = require("./menu");
Menu.setApplicationMenu(menu);

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  {
    scheme: "app",
    privileges: {
      secure: true,
      standard: true,
    },
  },
]);

async function createWindow() {
  const iconPath = path.join(__dirname, "./favicon.ico");
  tray = new Tray(nativeImage.createFromPath(iconPath));

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Mostrar",
      click: function () {
        win.show();
        win.focus();
      },
    },
    {
      label: "Salir",
      click: function () {
        app.quit();
      },
    },
  ]);
  tray.on("click", () => {
    win.show();
    win.focus();
  });
  tray.setToolTip("Nexus Clips");
  tray.setContextMenu(contextMenu);

  // Create the browser window.
  win = new BrowserWindow({
    width: 550,
    height: 600,
    resizable: false,
    center: true,
    titleBarStyle: "hidden",
    backgroundColor: "#000033",
    hideWhenClickingClose: "true",
    frame: false,
    icon: __dirname + "./favicon.ico",
    webPreferences: {
      // Required for Spectron testing
      enableRemoteModule: true,
      // Use pluginOptions.nodeIntegration, leave this alone See
      // nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration
      // for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
    },
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
    console.log("start dev");
  } else {
    //win.webContents.openDevTools();
    createProtocol("app");
    // Load the index.html when not in development
    win.hide();
    win.loadURL("app://./index.html");

    ipcMain.on("loginCheckingShow", (event, arg) => {
      if (arg == true) win.show();
      win.focus();
      mixpanel.track("Session", {
        Type: "Guest",
        Device: "Desktop",
        Version: app.getVersion(),
      });
    });

    const gameDVRPath =
      "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\GameDVR\\";
    // Read xbox game bar enabled and renderer it
    /*regedit.list(gameDVRPath, function (err, result) {
      let xboxValue = result[gameDVRPath];
      //console.log(xboxValue);
      let AppCaptureEnabled = xboxValue.values["AppCaptureEnabled"].value;
      let HistoricalCaptureEnabled = xboxValue.values["HistoricalCaptureEnabled"].value;
      // IF Xboxgamebar or record in background are disabled, activate default options
      if (AppCaptureEnabled === 0 || HistoricalCaptureEnabled === 0) {
        regedit.putValue(Init_XboxGameBar, function () {});
      }
      // Send default values to renderer
      let MicrophoneCaptureEnabled = xboxValue.values["MicrophoneCaptureEnabled"].value;
      let EnablePerAppAudio = xboxValue.values["EnablePerAppAudio"].value;
      let HistoricalBufferLength = xboxValue.values["HistoricalBufferLength"].value;
      let VKSaveHistoricalVideo = xboxValue.values["VKSaveHistoricalVideo"].value;
      let VKMSaveHistoricalVideo = xboxValue.values["VKMSaveHistoricalVideo"].value;
      win.webContents.send("xboxgameUserOptions", MicrophoneCaptureEnabled,EnablePerAppAudio,HistoricalBufferLength, VKMSaveHistoricalVideo, VKSaveHistoricalVideo);

    });*/
  }
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar to stay active
  // until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the dock icon is
  // clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished initialization and is
// ready to create browser windows. Some APIs can only be used after this event
// occurs.
app.on("ready", async () => {
  app.setAppUserModelId("com.nexusclips.app");
  // Autolaunch on Windows startup
  let autoLaunch = new AutoLaunch({
    name: "Nexus Clips",
    path: app.getPath("exe"),
    isHidden: true,
  });
  autoLaunch.isEnabled().then((isEnabled) => {
    if (!isEnabled) autoLaunch.enable();
  });
});

if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (win) {
      win.show();
      win.focus();
    }
  });

  app.on("ready", async () => {
    if (isDevelopment && !process.env.IS_TEST) {
      // Install Vue Devtools
      try {
        await installExtension(VUEJS_DEVTOOLS);
      } catch (e) {
        console.error("Vue Devtools failed to install:", e.toString());
      }
    }
    createWindow();
  });
}

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
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

app.on("ready", () => {
  if (process.env.NODE_ENV === "production") {
    autoUpdater.checkForUpdates();
  }
});

autoUpdater.on("checking-for-update", () => {});
autoUpdater.on("update-available", () => {});
autoUpdater.on("update-not-available", () => {});
autoUpdater.on("error", (err) => {
  // logAndShowDialog('Error in auto-updater. ' + err);
});

autoUpdater.on("update-downloaded", () => {
  //logAndShowDialog('Applying changes...');
  setImmediate(() => {
    app.removeAllListeners("window-all-closed");
    autoUpdater.quitAndInstall(true, true);
  });
});

// Notification clip capturado
function showNotification() {
  const notification = {
    title: "Clip capturado",
    //icon: './favicon.ico',
    //body: 'la la la lalla',
    urgency: "critical",
  };
  new Notification(notification).show();
}

// Quitar notificaciones xboxgamebar
var Notifications_XboxGameBar = {
  "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Notifications\\Settings\\Microsoft.XboxGamingOverlay_8wekyb3d8bbwe!App":
    {
      // Crear valor para desactivas las notis
      Enabled: {
        value: 0,
        type: "REG_DWORD",
      },
    },
};
//regedit.putValue(Notifications_XboxGameBar, function () {});

var Init_XboxGameBar = {
  "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\GameDVR": {
    AppCaptureEnabled: {
      //Xbox Game bar
      value: 1,
      type: "REG_DWORD",
    },
    HistoricalCaptureEnabled: {
      // Grabar en segundo plano mientras juego
      value: 1,
      type: "REG_DWORD",
    },
    HistoricalCaptureOnBatteryAllowed: {
      // Grabar aunque mi PC no esté conectado
      value: 1,
      type: "REG_DWORD",
    },
    HistoricalCaptureOnWirelessDisplayAllowed: {
      // Grabar mientras se proyecta la pantalla de manera inalámbrica
      value: 1,
      type: "REG_DWORD",
    },
    AudioCaptureEnabled: {
      // Audio grabado
      value: 1,
      type: "REG_DWORD",
    },
    EnablePerAppAudio: {
      // Grabar sólo el audio del juego
      value: 1,
      type: "REG_DWORD",
    },
    MicrophoneCaptureEnabled: {
      value: 0,
      type: "REG_DWORD",
    },
    VideoEncodingFrameRateMode: {
      // FPS (0 = 30, 1 = 60)
      value: 0,
      type: "REG_DWORD",
    },
    VideoEncodingBitrateMode: {
      // Calidad ( ALTA = 1, NORMAL = 2)
      value: 2,
      type: "REG_DWORD",
    },
  },
};
regedit.putValue(Init_XboxGameBar, function () {});
var ShortCut_XboxGameBar = {
  "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\GameDVR": {
    VKMSaveHistoricalVideo: {
      value: 0,
      type: "REG_DWORD",
    },
    VKSaveHistoricalVideo: {
      value: 0,
      type: "REG_DWORD",
    },
  },
};
regedit.putValue(ShortCut_XboxGameBar, function () {});

app.on("ready", () => {});

// Read ALL Hardware information
// Read ALL Hardware information
const si = require("systeminformation");
saveInfo();
function saveInfo() {
  si.getAllData()
    .then((data) => {
      win.webContents.send('saveInfo', data);
    })
    .catch((error) => console.error(error));
}
ipcMain.on('saveInfo', () => {
  saveInfo();
});

// Import s3 client
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client, BUCKET } from "./utils/s3Client.js";

// Import library to listen clips folder
const chokidar = require("chokidar");

// Listen to xbox game bar clips path getVideosFolder()
const watcher = chokidar.watch(getVideosFolder() + "\\Captures\\*.mp4", {
  awaitWriteFinish: false,
});
watcher.on("add", (fileToUpload) => {
  let clipName = path.basename(fileToUpload);
  console.log("Name of the video => " + user_id + "___" + clipName);
  setTimeout(function () {
    uploadFile(fileToUpload, clipName)
      .then(console.log("Subiendo video..."))
      .catch((error) =>
        console.log("There was an error uploading file: " + error)
      );
  }, 5000);
});

// Upload file to s3
const uploadFile = async (filePath, clipName) => {
  console.log("uploading file...");
  const params = {
    Bucket: BUCKET,
    Key: "clips/" + user_id + "___" + clipName,
    Body: fs.createReadStream(filePath),
  };
  try {
    await s3Client.send(new PutObjectCommand(params));
  } catch (error) {
    console.log("ERROR uploading S3: " + error);
    // Mixpanel error subir clip
    mixpanel.track("Clip", {
      Element: "Error",
      Device: "Desktop",
      Version: app.getVersion(),
    });
  } finally {
    console.log("finished uploading file...");

    win.webContents.send('saveClip', params.Key);

    // Mixpanel clip subido
    mixpanel.track("Clip", {
      distinct_id: user_id,
      Element: "Subido",
      Device: "Desktop",
      Version: app.getVersion(),
    });

    // Delete clip after successful upload
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Clip borrado");
    });
  }
};
