<template>
  <input
    class="text-input-atom"
    :type="type"
    :placeholder="placeholder"
    :value="value"
    @input="$emit('input', $event.target.value)"
  />
</template>

<script>
export default {
  name: "TextInputAtom",
  props: {
    placeholder: String,
    value: String,
    type: {
      type: String,
      default: "email",
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/ui/themes/default/variables";

.text-input-atom {
  border-radius: 4px;
  border: 1px solid $dark-1;
  padding: 5px 7px;
  background: $dark-0;
  color: $gray-4;
  line-height: 35px;
  border-radius: 10px;
}
</style>
