<template>
  <PageAtom class="login-controller">
    <h2 class="page-title">Bienvenido a Nexus Clips</h2>

    <FlexLayout middle center>
      <CredentialsForm />
    </FlexLayout>
  </PageAtom>
</template>

<script>
import { CredentialsForm } from "./container/credentials-form";
const { ipcRenderer } = require("electron");

export default {
  name: "LoginController",
  components: {
    CredentialsForm,
  },
  mounted: function () {
    this.$nextTick(function () {
      ipcRenderer.send("loginCheckingShow", true);
    });
  },
};
</script>

<style lang="scss" scoped>
@import "@/ui/themes/default/variables";

.login-controller {
  height: inherit;

  .page-title {
    text-align: center;
    margin-top: 40px;
    margin-bottom: 20px;
    color: $gray-5;
  }
}
</style>
