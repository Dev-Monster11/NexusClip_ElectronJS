<template>
  <TextInputAtom
    class="secure-input-molecule"
    type="password"
    :placeholder="placeholder"
    :value="value"
    @input="$emit('input', $event)"
  />
</template>

<script>
import { TextInputAtom } from "../../atoms/text-input";

export default {
  name: "SecureInputMolecule",
  components: {
    TextInputAtom,
  },
  props: {
    placeholder: {
      type: String,
      default: "Contraseña",
    },
    value: String,
  },
};
</script>
