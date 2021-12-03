<template>
  <vs-button
    dark
    border
    flat
    size="l"
    class="button-atom"
    @click="$emit('clicked', $event)"
  >
    <slot />
  </vs-button>
</template>

<script>
export default {
  name: "ButtonLogoutAtom",
};
</script>

<style lang="scss" scoped>
@import "@/ui/themes/default/variables";
</style>
