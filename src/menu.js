const { app, Menu, shell } = require("electron");

const template = [
  {
    label: "Ayuda",
    submenu: [
      {
        label: "Canal Discord",
        click() {
          shell.openExternal("https://discord.gg/62mxv72XeS");
        },
      },
      {
        label: "hello@nexusclips.com",
        //click() {
        //  shell.openExternal("mailto://xyz@abc.com?subject=MySubject&body=");
        //},
      },
    ],
  },
  {
    label: app.getVersion(),
  },
];

const menu = Menu.buildFromTemplate(template);
module.exports = menu;
