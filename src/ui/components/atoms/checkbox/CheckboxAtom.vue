<template>
  <div class="center">
    <vs-checkbox v-model="option"> Option 1ss </vs-checkbox>
  </div>
</template>

<script>
export default {
  name: "CheckboxAtom",
};
</script>

<style lang="scss" scoped>
@import "@/ui/themes/default/variables";

.checkbox-atom {
  color: $white;
  border-radius: 4px;
  padding: 10px 5px !important;
  vertical-align: middle;
  color: $gray-6;
  border: 1px solid #cacece;
}

.checkboxLabel {
  color: $white;
  padding: 10px 5px !important;
  vertical-align: middle;
  color: $gray-5;
}
</style>
