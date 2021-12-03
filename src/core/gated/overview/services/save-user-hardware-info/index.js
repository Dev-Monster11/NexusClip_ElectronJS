import { saveUserHardwareInNexus } from "./saveUserHardwareInNexus";

export async function saveInfo(userInfo) {
  await saveUserHardwareInNexus(userInfo);
}
