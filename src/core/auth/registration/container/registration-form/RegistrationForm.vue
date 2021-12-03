<template>
  <CardAtom class="registration-form">
    <StackLayout>
      <EmailInputMolecule v-model="email" />

      <SecureInputMolecule
        class="registration-form__password"
        v-model="password"
      />

      <p v-if="error">{{ error }}</p>

      <ButtonAtom class="registration-form__button" @clicked="onClicked"
        >Register</ButtonAtom
      >

      <router-link class="registration-form__link" :to="{ name: 'auth.login' }">
        Login
      </router-link>
    </StackLayout>
  </CardAtom>
</template>

<script>
import { ButtonAtom } from "@/ui/components/atoms/button";
import { CardAtom } from "@/ui/components/atoms/card";

import { EmailInputMolecule } from "@/ui/components/molecules/email-input";
import { SecureInputMolecule } from "@/ui/components/molecules/secure-input";

import { submitNewUser } from "../../services/submit-new-user";

export default {
  name: "RegistrationForm",
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
    };
  },
  methods: {
    onClicked() {
      this.submit();
    },
    async submit() {
      this.error = "";
      this.submitting = true;

      if (!this.email) {
        return;
      }

      try {
        await submitNewUser(this.email, this.password);

        this.$router.push({ name: "gated" });
      } catch (error) {
        this.error = error.message;
        console.log(error);
      }

      this.submitting = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.registration-form {
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
</style>
