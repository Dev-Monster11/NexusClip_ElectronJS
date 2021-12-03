<template>
  <vs-button
    gradient
    color="#42ba96"
    size="xl"
    class="button-atom"
    @click="$emit('clicked', $event)"
  >
    <slot />
  </vs-button>
</template>

<script>
export default {
  name: "ButtonAtom",
};
</script>

<style lang="scss" scoped>
@import "@/ui/themes/default/variables";

.button-atom {
  color: $white;
  line-height: 1;
  vertical-align: middle;
  cursor: pointer;
  color: $gray-6;
}
</style>
