export async function xboxRecordTime(value) {
  var regedit = require("regedit");
  regedit.setExternalVBSLocation("resources/regedit/vbs");

  // IMPORTANT
  var valuesToPut = {
    "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\GameDVR": {
      HistoricalBufferLength: {
        value: value,
        type: "REG_DWORD",
      },
    },
  };
  return regedit.putValue(valuesToPut, function () {});
}
