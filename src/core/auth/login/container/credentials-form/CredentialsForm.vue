<template>
  <CardAtom class="credentials-form">
    <StackLayout>
      <EmailInputMolecule v-model="email" />

      <SecureInputMolecule
        class="credentials-form__password"
        v-model="password"
      />

      <p class="error" v-if="error">{{ error }}</p>

      <ButtonAtom class="credentials-form__button" @clicked="onClicked"
        >Entrar</ButtonAtom
      >

      <vs-button white border v-on:click="CrearCuenta()">
        Crear cuenta
      </vs-button>

      <!-- <router-link
        class="credentials-form__link"
        :to="{ name: 'auth.registration' }"
      > 
        Crear cuenta
      </router-link> -->
    </StackLayout>
  </CardAtom>
</template>

<script>
import { ButtonAtom } from "@/ui/components/atoms/button";
import { CardAtom } from "@/ui/components/atoms/card";
import { EmailInputMolecule } from "@/ui/components/molecules/email-input";
import { SecureInputMolecule } from "@/ui/components/molecules/secure-input";
import { submitCredentials } from "../../services/submit-credentials";
const { shell } = require("electron");
const { ipcRenderer } = require("electron");

export default {
  name: "CredentialsForm",
  components: {
    ButtonAtom,
    CardAtom,
    EmailInputMolecule,
    SecureInputMolecule,
  },
  data() {
    return {
      submitting: false,
      email: "",
      password: "",
      error: "",
      ipc: ipcRenderer,
    };
  },
  methods: {
    registerWeb: function (link, target = "_blank") {
      window.open(link, target);
    },
    onClicked() {
      this.submit();
    },
    CrearCuenta() {
      shell.openExternal("https://nexusclips.com/registro.php?origin=desktop");
      ipcRenderer.send("mixpanel_CreateAccount", "Crear cuenta");
    },
    async submit() {
      ipcRenderer.send("mixpanel_LoginAccount", "Entrar");
      this.error = "";
      this.submitting = true;

      if (!this.email || !this.password) {
        return;
      }

      try {
        const { token } = await submitCredentials(this.email, this.password);
        this.$keychain.setPassword(token);
        this.ipc.send("saveInfo");

        this.$router.push({ name: "gated" });
      } catch (error) {
        this.error = "El email o la contraseña son incorrectos";
        console.log(error);
      }

      this.submitting = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.credentials-form {
  &__button {
    margin-top: 20px;
  }

  &__password {
    margin-top: 10px;
  }

  &__link {
    text-align: center;
    margin-top: 10px;
  }
}
@import "@/ui/themes/default/variables";

.error {
  color: $danger;
  font-size: 12px;
}
</style>
