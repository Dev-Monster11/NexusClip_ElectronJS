import { boot } from "./boot";
import { Titlebar, Color } from "custom-electron-titlebar";

new Titlebar({
  backgroundColor: Color.fromHex("#192030"),
  drag: true,
  icon: "./favicon.ico",
  maximizable: false,
  overflow: true,
  hideWhenClickingClose: true,
});

const { NODE_ENV, VUE_APP_BASE_URL } = process.env;

boot({
  mode: NODE_ENV,
  baseUrl: VUE_APP_BASE_URL,
  appId: "nexus-clips",
});

//const { remote } = require('electron')
//remote.getCurrentWindow().minimize();
