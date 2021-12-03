<template>
  <TextInputAtom
    class="email-input-molecule"
    placeholder="Correo electrónico"
    :value="value"
    @input="$emit('input', $event)"
  />
</template>

<script>
import { TextInputAtom } from "../../atoms/text-input";

export default {
  name: "EmailInputMolecule",
  components: {
    TextInputAtom,
  },
  props: {
    value: String,
  },
};
</script>
