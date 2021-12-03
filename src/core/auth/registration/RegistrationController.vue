<template>
  <PageAtom class="registration-controller">
    <h2 class="page-title">Registration</h2>

    <FlexLayout middle center>
      <RegistrationForm />
    </FlexLayout>
  </PageAtom>
</template>

<script>
import { RegistrationForm } from "./container/registration-form";

export default {
  name: "RegistrationController",
  components: {
    RegistrationForm,
  },
};
</script>

<style lang="scss" scoped>
.registration-controller {
  height: inherit;

  .page-title {
    text-align: center;

    margin-top: 20px;
    margin-bottom: 40px;
  }
}
</style>
