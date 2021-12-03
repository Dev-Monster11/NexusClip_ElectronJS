export async function xboxOnlyGameSound(value) {
  var regedit = require("regedit");
  regedit.setExternalVBSLocation("resources/regedit/vbs");

  // IMPORTANT
  var valuesToPut = {
    "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\GameDVR": {
      EnablePerAppAudio: {
        value: value,
        type: "REG_DWORD",
      },
    },
  };
  return regedit.putValue(valuesToPut, function () {});
}
