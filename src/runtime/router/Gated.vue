<template>
  <div class="gated">
    <router-view />
  </div>
</template>
<script>
const { ipcRenderer } = require("electron");
const jwt = require("jsonwebtoken");
import { Http } from "@/utils/Http";
const http = new Http("https://api-prod.nexusclips.com");

export default {
  data() {
    return {
      ipc: ipcRenderer,
    };
  },
  mounted() {
    //this.ipc.removeAllListeners();
    this.ipc.on("saveClip", async (e, value) => {
      const token = await this.$keychain.getPassword();
      const userId = jwt.decode(token).iss;
      const path = `v1/users/${userId}/clips`;
      const clipInfo = {
        clipName: value,
      };
      await http.post(path, clipInfo, {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      });
    });
  },
};
</script>
