<template>
  <div class="auth">
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
    this.ipc.removeAllListeners();
    this.ipc.once("saveInfo", async (e, data) => {
      const token = await this.$keychain.getPassword();
      const userId = jwt.decode(token).iss;
      const path = `v1/users/${userId}/hardware`;
      const userHWInfo = {
        info: JSON.stringify(data),
      };
      await http.post(path, userHWInfo, {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      });
    });
  },
};
</script>

<style lang="scss" scoped>
.auth {
  min-height: 10vh;
}
</style>
