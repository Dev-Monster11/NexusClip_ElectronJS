<template>
  <div class="stack-layout">
    <slot />
  </div>
</template>

<script>
export default {
  name: "StackLayout",
};
</script>

<style lang="scss" scoped>
.stack-layout {
  display: grid;
  grid-auto-flow: row;
  width: 100%;
}
</style>
