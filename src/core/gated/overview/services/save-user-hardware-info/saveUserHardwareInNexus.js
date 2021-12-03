import { Http } from "@/utils/Http";
import Vue from "vue";

const http = new Http("https://api-prod.nexusclips.com");

export async function saveUserHardwareInNexus(userInfo) {
  const token = await Vue.$keychain.getPassword();

  const userHWInfo = {
    info: JSON.stringify(userInfo),
  };

  await http.post(path, userHWInfo, {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  });
}
