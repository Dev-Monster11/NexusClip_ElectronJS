export async function xboxMicOn(value) {
  var regedit = require("regedit");
  regedit.setExternalVBSLocation("resources/regedit/vbs");

  // IMPORTANT
  var valuesToPut = {
    "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\GameDVR": {
      MicrophoneCaptureEnabled: {
        // Activar micrófono de forma predeterminada durante la grabación
        value: value,
        type: "REG_DWORD",
      },
    },
  };
  return regedit.putValue(valuesToPut, function () {});
}
