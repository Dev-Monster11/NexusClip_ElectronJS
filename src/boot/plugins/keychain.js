import os from "os";

import { Keychain } from "@/utils/Keychain";

export default ({ Vue, config }) => {
  const keychain = new Keychain(os.userInfo().username, config.appId);

  Object.defineProperty(Vue, "$keychain", {
    get() {
      return keychain;
    },
  });

  Object.defineProperty(Vue.prototype, "$keychain", {
    get() {
      return keychain;
    },
  });
};
