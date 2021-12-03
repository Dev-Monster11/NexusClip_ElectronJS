import Vue from "vue";

import { LocalStorage } from "@/utils/LocalStorage";

export async function logout() {
  await Vue.$keychain.deletePassword();
  LocalStorage.remove("user");
}
